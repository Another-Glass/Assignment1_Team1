import express from 'express';
import helmet from 'helmet';
import logger from 'morgan';
import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';

import routes from './global/routes';
import globalRouter from './routes/globalRouter';
import userRouter from './routes/userRouter';
// import postRouter from './routes/postRouter';

import connectDB from './utils/db';
connectDB();

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(helmet({
  contentSecurityPolicy: false
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(routes.root, globalRouter);
app.use(routes.user, userRouter);
// app.use(routes.post, postRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
