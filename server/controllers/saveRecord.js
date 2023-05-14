import jwt from "jsonwebtoken";
import { MongoClient } from "mongodb"

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DATABASE_NAME;


const saveRecord = async (req, res) => {
  try {
    const token = req.cookie.accessToken;
    if (!token) throw 404;
    const tokenInfo = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    const userId = tokenInfo.userId;
    const username = tokenInfo.username;

    const client = new MongoClient(MONGO_URI);
    const db = client.db(DB_NAME);
    const collection = db.collection(userId);

    const score = (req.body.correctQuizNumbers / req.body.duration).toFixed(3) * 100;
    const insertData = {
      correctQuizNumbers: req.body.correctQuizNumbers,
      duration: req.body.duration,
      score: score
    }
    const insertDataInChart = {
      ...insertData,
      username: username
    }
    const result = await collection.insertOne(insertData);
    const resultChart = await db.collection('chart').insertOne(insertDataInChart);
    console.log(`Record was inserted in UserCollection with the _id: ${result.insertedId}`);
    console.log(`Record was inserted in ChartCollection with the _id: ${resultChart.insertedId}`);
    res.status(200);
  } catch (error) {
    res.status(error);
  }
}

export default saveRecord;