require('dotenv').config();
const { MongoClient } = require('mongodb');
const MONGO_URI = process.env.MONGO_URI;

const client = new MongoClient(MONGO_URI);
const connectdb = async () => {
    try {
        const database = client.db('soccer-quiz-mobile');
        const post = database.collection('userInfo');
        // post.insertOne({ name: 'testtest' });
        console.log('MonogoDB connected!');
    } finally {
        await client.close();
    }
}
module.exports = connectdb;
