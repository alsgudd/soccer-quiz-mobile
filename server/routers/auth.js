import express from 'express'
import signIn from "../controllers/signIn.js"
import signUp from '../controllers/signUp.js';

const Router = express.Router();


Router.post('/signup', signUp);
Router.post('/login', signIn)
// Router.post('/login', signIn);

export default Router;