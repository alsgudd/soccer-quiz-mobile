import express from 'express'
import getrecord from '../controllers/getrecord.js';
import getname from '../controllers/getname.js'

const Router = express.Router();

Router.get('/record', getrecord);
Router.get('/name', )
export default Router;