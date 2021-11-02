import express from "express";
import routes from '../global/routes';

import { checkToken } from '../middlewares/auth';
import { getPost, postPost, getPostList, putPost, deletePost } from '../controllers/postController';

const postRouter = express.Router();

postRouter.get(routes.root, getPostList);
postRouter.post(routes.root, checkToken, postPost);

postRouter.get(routes.postDetail, checkToken, getPost);
postRouter.put(routes.postDetail, checkToken, putPost);
postRouter.delete(routes.postDetail, checkToken, deletePost);


export default postRouter;