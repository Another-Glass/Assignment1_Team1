import express from 'express';
import routes from '../global/routes';

const globalRouter = express.Router();

globalRouter.get(routes.root, function (req, res, next) {
  res.render('index', { title: 'Express' });
});

export default globalRouter;
