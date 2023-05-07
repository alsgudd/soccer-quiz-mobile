const connectdb = require('./db/connectdb')
const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

require('dotenv').config();

app.use(express.json());
var cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  // 사용자와의 통신에서 쿠키를 사용해서 통신할 예정이기 때문에.
  credentials: true
}));
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(8080, function () {
  console.log(`listening on ${PORT}`);
  connectdb();
});

app.use(express.static(path.join(__dirname, '../client/build')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
})