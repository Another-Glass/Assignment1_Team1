import express from "express";
import routes from '../global/routes';

import { checkToken } from '../middlewares/auth';
import { getPost, postPost, getPostList, putPost, deletePost, getSearchPost } from '../controllers/postController';
import { getCommentInComment, postComment, deleteComment, putComment, getCommentList, postCommentInComment } from '../controllers/commentController';

const postRouter = express.Router();

postRouter.get(routes.root, getPostList);
postRouter.post(routes.root, checkToken, postPost);

postRouter.get(routes.postDetail, checkToken, getPost);
postRouter.put(routes.postDetail, checkToken, putPost);
postRouter.delete(routes.postDetail, checkToken, deletePost);

postRouter.get(routes.postSearch, getSearchPost);

postRouter.post(routes.postDetail + routes.comment, checkToken, postComment);
postRouter.get(routes.postDetail + routes.comment, getCommentList);
postRouter.get(routes.postDetail + routes.comment + routes.commentDetail, getCommentInComment);
postRouter.post(routes.postDetail + routes.comment + routes.commentDetail, checkToken, postCommentInComment);
postRouter.delete(routes.postDetail + routes.comment + routes.commentDetail, checkToken, deleteComment);
postRouter.put(routes.postDetail + routes.comment + routes.commentDetail, checkToken, putComment);


export default postRouter;