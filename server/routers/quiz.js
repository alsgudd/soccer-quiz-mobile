import express from 'express';
import getquiz from '../controllers/getquiz.js'
const Router = express.Router();

Router.get('/get', getquiz);


export default Router;