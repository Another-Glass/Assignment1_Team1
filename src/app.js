import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';

import logger from './utils/logger';
import { statusCode, routes, responseMessage } from './globals/*';
import util from './utils/resFormatter.js';
import globalRouter from './routes/globalRouter.js';
import userRouter from './routes/userRouter.js';
import postRouter from './routes/postRouter.js';
import connectDB from './models/init.js';
//DB연결
connectDB();

//서버 사전작업
const app = express();

//미들웨어 설정
app.use(helmet({
  contentSecurityPolicy: false
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//라우터 설정
app.use(routes.root, globalRouter);
app.use(routes.user, userRouter);
app.use(routes.post, postRouter);


// 아래는 에러 핸들링 함수들

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  let errCode = err.status || statusCode.INTERNAL_SERVER_ERROR;
  let message = req.app.get('env') != 'production' ? err.message : responseMessage.INTERNAL_SERVER_ERROR;

  console.log(err);
  return res.status(errCode)
    .send(util.fail(errCode, message));
});

module.exports = app;
