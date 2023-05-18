import express from 'express'
import getrecord from '../controllers/getrecord';

const Router = express.Router();

Router.get('/record', getrecord);

export default Router;