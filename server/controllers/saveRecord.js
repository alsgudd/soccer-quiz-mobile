import jwt from "jsonwebtoken";
import { MongoClient } from "mongodb"

import {
  connectToMongo,
  getDB,
  disconnectFromMongo
} from "../db/db.js";

const saveRecord = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) throw 404;
    const tokenInfo = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    const userId = tokenInfo.userId;
    const username = tokenInfo.name;
    console.log(req.body.quizTeam);
    const insertData = {
      score: req.body.score,
      quizTeam: req.body.quizTeam
    }
    const result = await saveRecordInDB(insertData, userId, username);
  } catch (error) {
    res.status(404).json(error);
  }
}

async function saveRecordInDB(insertData, userId, username) {
  connectToMongo();
  let result;
  try {
    const db = getDB();
    const usercollection = db.collection(userId);
    const chartcollection = db.collection('chart');

    const insertDataInChart = {
      ...insertData,
      username: username
    }
    const resultUser = await usercollection.insertOne(insertData);
    const resultChart = await chartcollection.insertOne(insertDataInChart);
    console.log(`Record was inserted in UserCollection with the _id: ${resultUser.insertedId}`);
    console.log(`Record was inserted in ChartCollection with the _id: ${resultChart.insertedId}`);
    result = { resultUser, resultChart };
  } catch (error) {
    console.error('Failed to perform MongoDB operation:', error);
  } finally {
    disconnectFromMongo();
  }

  return result;
}

export default saveRecord;