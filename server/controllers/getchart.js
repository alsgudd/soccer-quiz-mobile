import { MongoClient } from 'mongodb';

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DATABASE_NAME

const getquiz = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI);
    const db = client.db(DB_NAME);
    const collection = db.collection('chart');
    const result = await collection.find().sort({ score: -1 }).toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json(error);
  }

}

export default getquiz;