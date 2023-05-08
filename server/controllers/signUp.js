import { MongoClient } from 'mongodb';
import crypto from 'crypto'
import util from 'util'

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DATABASE_NAME

const client = new MongoClient(MONGO_URI);
const db = client.db(DB_NAME);
const collection = db.collection('userInfo');

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

const createHashedPassword = async (password) => {
  const salt = await createSalt();
  const key = await pbkdf2Promise(password, salt, 104999, 64, 'sha512');
  const hashedPassword = key.toString('base64');

  return { hashedPassword, salt };
}

const signUp = async (req, res) => {
  try {
    // console.log(found);
    if (await isemailExist(req.body.email)) {
      throw new Error('해당 이메일이 이미 존재합니다.');
    }
    let temp = await createHashedPassword(req.body.password);
    let secretPW = temp.hashedPassword;
    let salt = temp.salt;

    let insertData = {
      name: req.body.name,
      email: req.body.email,
      password: secretPW,
      salt: salt
    }
    await collection.insertOne(insertData);
    console.log(`${req.body} is inserted!`);
  } catch (e) {
    res.status(400).json(e)
  }
}


export default signUp;