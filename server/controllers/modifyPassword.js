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
    if(!token) throw new Error("Token Expired");
    const tokenInfo = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userEmail = tokenInfo.email;
    const result = await modifyPasswordInDB(userEmail, req.body.passwordToChange, req.body.currentPassword);
    if(!result) throw new Error("The current password is not correct.")
    res.status(200).json({ message: "Modify Success!" });
  } catch (error) {
    if(error.message === "Token Expired") {
      res.status(401).json({ error: error.message });
    } else if(error.message === "The current password is not correct.") {
      res.status(402).json({ error: error.message });
    } else {
      res.status(404).json({ error: error });
    }
  }
}

async function modifyPasswordInDB(email, passwordToChange, currentPassword) {
  connectToMongo();
  try {
    const db = getDB();
    const collection = db.collection('userInfo');
    const userInfo = await collection.findOne({ email: email })
    const isCorrectPW = await verifyPassword(currentPassword, userInfo.salt, userInfo.password);
    if(!isCorrectPW) throw new Error();
    const { hashedPassword, salt } = await createHashedPassword(passwordToChange);
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
    return true;
  } catch (error) {
    return false;
    // console.log(error);
  } finally {
    disconnectFromMongo();
  }
}

export default modifyPassword;