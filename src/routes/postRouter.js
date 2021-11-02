import express from "express";
import routes from '../global/routes';

import { checkToken } from '../middlewares/auth';
import { getPost, postPost, getPostList, putPost, deletePost } from '../controllers/postController';

const postRouter = express.Router();

postRouter.post(routes.root, checkToken, postPost);

export default postRouter;