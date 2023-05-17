import express from 'express';
import getchart from '../controllers/getchart.js';

const Router = express.Router();

Router.get('/get', getchart);

export default Router;