import {
  connectToMongo,
  getDB,
  disconnectFromMongo,
} from "../db/db.js";


const getchart = async (req, res) => {
  try {
    const result = await getChartInDB();
    res.status(200).json({ charts: result })
  } catch (error) {
    res.status(404).json(error);
  }
}

async function getChartInDB() {
  connectToMongo();
  let result;
  try {
    const db = getDB();
    const collection = db.collection('chart');
    result = await collection.find().sort({ score: -1 }).toArray();
  } catch (error) {
    console.error('Failed to perform MongoDB operation:', error);
  } finally {
    disconnectFromMongo();
  }
  return result;
}

export default getchart;