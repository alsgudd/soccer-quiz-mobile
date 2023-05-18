import {
  connectToMongo,
  getDB,
  disconnectFromMongo
} from "../db/db.js";
import jwt from "jsonwebtoken";
import { verifyPassword } from "./signIn.js";
import { createHashedPassword } from "./signUp.js";

const modifyPassword = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if(!token) throw new Error();
    const tokenInfo = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    const userEmail = tokenInfo.email;
    await modifyPasswordInDB(userEmail, req.body.currentPassword);
    res.status(200);
  } catch (error) {
    res.status(404).json(error);
  }
}

async function modifyPasswordInDB(email, password) {
  connectToMongo();
  try {
    const db = getDB();
    const collection = db.collection('userInfo');
    const userInfo = await collection.findOne({ email: email })
    const isCorrectPW = await verifyPassword(password, userInfo.salt, userInfo.password);
    if(!isCorrectPW) throw new Error();

    const { hashedPassword, salt } = await createHashedPassword(password);

    const filter = { email: email }
    const updateDoc = {
      $set: {
        password: hashedPassword,
        salt: salt 
      }
    }
    const result = await collection.updateOne(filter, updateDoc);
    console.log(
      `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
    );
  } catch (error) {
    
  } finally {
    disconnectFromMongo();
  }
}

export default modifyPassword;