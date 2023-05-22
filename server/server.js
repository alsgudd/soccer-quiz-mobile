import dotenv from 'dotenv'
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import authRouter from './routers/auth.js'
import quizRouter from './routers/quiz.js'
import chartRouter from './routers/chart.js'
import myPageRouter from './routers/mypage.js'

import cors from 'cors'
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

dotenv.config();
const app = express();
const PORT = process.env.PORT;


app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  // 사용자와의 통신에서 쿠키를 사용해서 통신할 예정이기 때문에.
  credentials: true
}));
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', authRouter);
app.use('/quiz', quizRouter)
app.use('/chart', chartRouter);
app.use('/mypage', myPageRouter)

app.listen(8080, function () {
  console.log(`listening on ${PORT}`);
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
})