import express from 'express';
import getquiz from '../controllers/getquiz.js'
import saveRecord from '../controllers/saveRecord.js';

const Router = express.Router();

Router.get('/get', getquiz);
Router.post('/save', saveRecord);


export default Router;