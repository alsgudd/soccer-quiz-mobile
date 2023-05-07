require('dotenv').config();
const { MongoClient } = require('mongodb');
const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DATABASE_NAME
const crypto = require('crypto');

const client = new MongoClient(MONGO_URI);
const db = client.db(DB_NAME);
const collection = db.collection('userInfo');

const util = require('util');
const randomBytesPromise = util.promisify(crypto.randomBytes);
const pbkdf2Promise = util.promisify(crypto.pbkdf2);

const jwt = require('jsonwebtoken');


const signUp = async (req, res) => {
  try {
    

    
  } catch (error) {
    
  }
}


