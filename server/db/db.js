// db.js
import { MongoClient } from 'mongodb';

const url = process.env.MONGO_URI;
const dbName = process.env.DATABASE_NAME;

let client;
let db;

async function connectToMongo() {
  try {
    client = new MongoClient(url);
    console.log('Connected to MongoDB');
    db = client.db(dbName);
  } catch (error) {
    throw new Error('Failed to connect to MongoDB');
  }
}

function getDB() {
  if (!client) {
    throw new Error('MongoDB is not connected');
  }
  return db;
}

function disconnectFromMongo() {
  if (client) {
    client.close();
    console.log('Disconnected from MongoDB');
  }
}

export {
  connectToMongo,
  getDB,
  disconnectFromMongo,
};
