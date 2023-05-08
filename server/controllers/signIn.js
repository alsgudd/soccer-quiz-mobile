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
const verifyPassword = async (password, userSalt, userPassword) => {
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
    // 유저의 비밀번호가 맞지 않는 경우
    if (!isCorrectPW) throw 403;
    try {
      // access Token 발급
      const accessToken = jwt.sign({
        email: userInfo.email,
        name: userInfo.name
      }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '60m',
        issuer: 'Lee'
      })
      // token을 쿠키에 담아서 전송
      res.cookie('accessToken', accessToken, {
        secure: false,
        // JS에서 쿠키 접근이 불가능하게 하기 위함.
        httpOnly: true
      })
      res.status(200).json({
        name: userInfo.name,
        message: 'login Success!'
      });
    } catch (error) {
      res.status(500).json(error);
    }
  } catch (errorcode) {
    if (errorcode === 402) {
      // 유저가 입력한 이메일이 없는 경우
      res.status(errorcode).json({ error: 'The email does not exist.' });
    } else if (errorcode === 403) {
      // 유저가 입력한 비밀번호가 일치하지 않는 경우
      res.status(errorcode).json({ error: 'Password does not match' })
    } else {
      res.status(500).json({ error: 'An unknown error has occurred. Please try again' })
    }

  }
}

export default signIn;