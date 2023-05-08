import express from 'express'
const Router = express.Router();
import signUp from '../controllers/signUp.js';


Router.post('/signup', signUp);
// Router.post('/login', signIn);

export default Router;