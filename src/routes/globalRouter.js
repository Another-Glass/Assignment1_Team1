import express from 'express';
import routes from '../global/routes';

const globalRouter = express.Router();

globalRouter.get(routes.root, function (req, res, next) {
  res.send("HelloWorld");
});

export default globalRouter;
