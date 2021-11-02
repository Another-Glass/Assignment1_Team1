import express from "express";
import routes from '../global/routes';

import { checkToken } from '../middlewares/auth';
import { getPost, postPost, getPostList, putPost, deletePost, getSearchPost } from '../controllers/postController';
import { getCommentInComment, postComment, deleteComment, putComment, getCommentList, postCommentInComment } from '../controllers/commentController';

const postRouter = express.Router();

//게시글 조회
postRouter.get(routes.root, getPostList);
//게시글 생성
postRouter.post(routes.root, checkToken, postPost);

//게시글 상세조회
postRouter.get(routes.postDetail, checkToken, getPost);
//게시글 수정
postRouter.put(routes.postDetail, checkToken, putPost);
//게시글 삭제
postRouter.delete(routes.postDetail, checkToken, deletePost);
//게시글 검색
postRouter.get(routes.postSearch, getSearchPost);

//댓글 생성
postRouter.post(routes.postDetail + routes.comment, checkToken, postComment);
//댓글 조회
postRouter.get(routes.postDetail + routes.comment, getCommentList);
//대댓글 조회
postRouter.get(routes.postDetail + routes.comment + routes.commentDetail, getCommentInComment);
//대댓글 생성
postRouter.post(routes.postDetail + routes.comment + routes.commentDetail, checkToken, postCommentInComment);
//댓글or대댓글 수정
postRouter.delete(routes.postDetail + routes.comment + routes.commentDetail, checkToken, deleteComment);
//댓글or대댓글 삭제
postRouter.put(routes.postDetail + routes.comment + routes.commentDetail, checkToken, putComment);


export default postRouter;