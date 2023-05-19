import express from 'express'
import signIn from "../controllers/signIn.js"
import signUp from '../controllers/signUp.js';
import validtoken from '../controllers/validtoken.js';
import logout from '../controllers/logout.js';

const Router = express.Router();

Router.post('/signup', signUp);
Router.post('/login', signIn)
Router.get('/valid', validtoken);
Router.get('/logout', logout);


export default Router;