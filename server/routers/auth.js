const express = require('express');
const Router = express.Router();
const {
  insertUserInfo,
  login,
  accessToken,
  loginSuccess,
  logout
} = require('../controller/auth');

Router.post('/sighup', insertUserInfo);
Router.post('/login', login);
Router.get('/accesstoken', accessToken);
Router.get('/islogin', loginSuccess);
Router.post('/logout', logout);

module.exports = Router;