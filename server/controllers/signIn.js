import util from 'util'
import jwt from 'jsonwebtoken';
import crypto from 'crypto'
import { isemailExist } from './signUp.js';
import { MongoClient } from 'mongodb';

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DATABASE_NAME

const client = new MongoClient(MONGO_URI);
const db = client.db(DB_NAME);
const collection = db.collection('userInfo');


const randomBytesPromise = util.promisify(crypto.randomBytes);
const pbkdf2Promise = util.promisify(crypto.pbkdf2);

// login Part!
export const verifyPassword = async (password, userSalt, userPassword) => {
  const key = await pbkdf2Promise(password, userSalt, 104999, 64, 'sha512');
  const hashedPassword = key.toString('base64');
  // console.log(hashedPassword === userPassword)
  if (hashedPassword === userPassword) return true;
  return false;
}

const foundUserInfo = async (email) => {
  let userInfo = await collection.findOne({ email: email })
  if (!userInfo) return null;
  return userInfo;
}


const signIn = async (req, res) => {
  try {
    if (!await isemailExist(req.body.email)) throw 402;
    const userInfo = await foundUserInfo(req.body.email);
    const isCorrectPW = await verifyPassword(req.body.password, userInfo.salt, userInfo.password);
    // email that user entered is not exist
    if (!isCorrectPW) throw 403;
    try {
      // access Token 발급
      const accessToken = jwt.sign({
        userId: userInfo._id,
        email: userInfo.email,
        name: userInfo.name
      }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '24h',
        issuer: 'Lee'
      })
      // Send Token in Cookie
      res.cookie('accessToken', accessToken, {
        secure: false,
        // Cannot Access In JS(Client)
        httpOnly: true
      })
      res.status(200).json({
        userId: userInfo._id,
        name: userInfo.name,
        message: 'login Success!',
      });
    } catch (error) {
      res.status(500).json(error);
    }
  } catch (errorcode) {
    if (errorcode === 402) {
      // case: email that user entered is not exist
      res.status(errorcode).json({ error: 'The email does not exist.' });
    } else if (errorcode === 403) {
      // case: password that user entered is not match
      res.status(errorcode).json({ error: 'Password does not match' })
    } else {
      // db error
      res.status(500).json({ error: 'An unknown error has occurred. Please try again' })
    }

  }
}

export default signIn;