import express from 'express';
import helmet from 'helmet';
import logger from 'morgan';
import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';

import util from './utils/util';
import statusCode from './utils/statusCode';
import responseMessage from './utils/responseMessage';
import routes from './global/routes';
import globalRouter from './routes/globalRouter';
import userRouter from './routes/userRouter';
import postRouter from './routes/postRouter';

import connectDB from './utils/db';

//DB연결
connectDB();

//서버 사전작업
const app = express();

//미들웨어 설정
app.use(helmet({
  contentSecurityPolicy: false
}));
app.use(logger('dev'));
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
  let message = req.app.get('env') === 'development' ? err.message : {};
  let errCode = err.status || statusCode.INTERNAL_SERVER_ERROR;

  return res.status(errCode)
    .send(util.fail(errCode, message));
});

module.exports = app;
