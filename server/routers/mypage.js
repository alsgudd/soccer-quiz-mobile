import express from 'express'
import getrecord from '../controllers/getrecord.js';
import getname from '../controllers/getname.js'
import modifyPassword from '../controllers/modifyPassword.js';

const Router = express.Router();

Router.get('/record', getrecord);
Router.get('/name', getname);
Router.put('/modify', modifyPassword)
export default Router;