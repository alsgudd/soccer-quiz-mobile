import { MongoClient } from 'mongodb';
const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DATABASE_NAME

const client = new MongoClient(MONGO_URI);
const db = client.db(DB_NAME);



const getquiz = async (req, res) => {
  const amount = req.query.amount;
  const team = req.query.team;
  const collection = db.collection(team);
  const quizArr = await collection.find({ }).toArray(function(err, result) {
    if(err) throw err;
    console.log(result);
  })
  const shuffle = () => ( Math.random() - 0.5 );
  const shuffledQuiz = [...quizArr].sort(shuffle);
  const returnValue = shuffledQuiz.slice(0, amount);
  
  res.json({results: returnValue});
}

export default getquiz;