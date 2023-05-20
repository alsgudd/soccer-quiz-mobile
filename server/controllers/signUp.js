import crypto from 'crypto'
import util from 'util'

import { 
  connectToMongo,
  getDB,
  disconnectFromMongo
} from "../db/db.js";

const randomBytesPromise = util.promisify(crypto.randomBytes);
const pbkdf2Promise = util.promisify(crypto.pbkdf2);

export const isemailExist = async (email) => {
  let found = await collection.findOne({ email: email })
  if (!found) return false;
  return true;
}

const createSalt = async () => {
  const buf = await randomBytesPromise(64);
  return buf.toString('base64');
}

export const createHashedPassword = async (password) => {
  const salt = await createSalt();
  const key = await pbkdf2Promise(password, salt, 104999, 64, 'sha512');
  const hashedPassword = key.toString('base64');
  
  return { hashedPassword, salt };
}

const signUp = async (req, res) => {
  try {
    const enteredValue = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    }
    const result = await performDBOperation(enteredValue);
    if(result.status !== 200) {
      const error = new Error(result.message);
      error.status = result.status;
      throw error;
    }
    res.status(200).json("signUp Success!")
  } catch (error) {    
    res.status(error.status).json({ error: error.message });
  }
}


async function performDBOperation(enteredValue) {
  connectToMongo();
  try {
    const db = getDB();
    const collection = db.collection('userInfo');
    const isEmailExist = await collection.findOne({ email: enteredValue.email });
    if(isEmailExist) throw new Error("Email Already Exist!");
    const { hashedPassword, salt } = await createHashedPassword(enteredValue.password);

    const insertDoc = {
      name: enteredValue.name,
      email: enteredValue.email,
      password: hashedPassword,
      salt: salt
    }

    const result = await collection.insertOne(insertDoc);
    const insertedId = result.insertedId.toString();
    const userCollection = await db.createCollection(insertedId);

    console.log(`Collection Inserted! Collection Name: ${userCollection.collectionName}`);
    return {
      status: 200,
      message: "Sign In Success!"
    }
  } catch (error) {      
    if(error.message === "Email Already Exist!") {
      return {
        status: 403,
        message: error.message,
      }
    } else {
      return {
        status: 500,
        message: "An unknown error has occurred. Please try again 🥲"
      }
    }
  } finally {
    disconnectFromMongo();
  }
}

export default signUp;