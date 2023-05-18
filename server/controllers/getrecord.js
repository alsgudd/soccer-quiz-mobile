import { 
  connectToMongo,
  getDB,
  disconnectFromMongo
} from "../db/db.js"
import jwt from "jsonwebtoken";

const getrecord = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if(!token) throw 404;
    const tokenInfo = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    const userId = tokenInfo.userId;
    const result = await getRecordInDB(userId);
    res.status(200).json({ record: result });
  } catch (error) {
    res.status(404).json(error);
  }
}

async function getRecordInDB(userId) {
  connectToMongo();
  let result;
  try {
    const db = getDB();
    const collection = db.collection(userId);
    result = await collection.find().sort({ score: -1 }).toArray()
  } catch (error) {
    console.error('Failed to perform MongoDB operation:', error);
  } finally {
    disconnectFromMongo();
  }
  return result;
}

export default getrecord;