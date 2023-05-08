import { MongoClient } from 'mongodb';
import dotenv from 'dotenv'
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
const client = new MongoClient(MONGO_URI);
const connectdb = async () => {
    try {
        const database = client.db('soccer-quiz-mobile');
        console.log('MonogoDB connected!');
    } finally {
        await client.close();
    }
}

export default connectdb;