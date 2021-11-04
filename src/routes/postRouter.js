import express from "express";
import routes from '../globals/routes.js';

import { checkToken } from '../middlewares/auth.js';
import * as postController from '../controllers/postController.js';
import * as commentController from '../controllers/commentController.js';

const postRouter = express.Router();

//게시글 조회
postRouter.get(routes.root, postController.getPostList);
//게시글 생성
postRouter.post(routes.root, checkToken, postController.postPost);

//게시글 상세조회
postRouter.get(routes.postDetail, checkToken, postController.getPost);
//게시글 수정
postRouter.put(routes.postDetail, checkToken, postController.putPost);
//게시글 삭제
postRouter.delete(routes.postDetail, checkToken, postController.deletePost);
//게시글 검색
postRouter.get(routes.postSearch, postController.getSearchPost);

//댓글 생성
postRouter.post(routes.postDetail + routes.comment, checkToken, commentController.postComment);
//댓글 조회
postRouter.get(routes.postDetail + routes.comment, commentController.getCommentList);
//대댓글 조회
postRouter.get(routes.postDetail + routes.comment + routes.commentDetail, commentController.getCommentInComment);
//대댓글 생성
postRouter.post(routes.postDetail + routes.comment + routes.commentDetail, checkToken, commentController.postCommentInComment);
//댓글or대댓글 수정
postRouter.delete(routes.postDetail + routes.comment + routes.commentDetail, checkToken, commentController.deleteComment);
//댓글or대댓글 삭제
postRouter.put(routes.postDetail + routes.comment + routes.commentDetail, checkToken, commentController.putComment);


export default postRouter;