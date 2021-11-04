import util from '../utils/resFormatter';
import { statusCode, responseMessage } from '../globals/*';

import * as commentService from '../services/commentService';
import * as postService from '../services/postService';

//댓글조회
export const getCommentList = async (req, res) => {
  try {
    const { postId } = req.params;
    const { offset, limit } = req.query;

    //입력값 확인
    if (postId === undefined) {
      return res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    //게시글 유무
    let post = await postService.readPost(postId);
    if (post === null) {
      return res.status(statusCode.NOT_FOUND)
        .send(util.fail(statusCode.NOT_FOUND, responseMessage.NO_POST));
    }

    //쿼리실행
    let comments = await commentService.readCommentsInPost(postId, Number(offset), Number(limit));

    return res.status(statusCode.OK)
      .send(util.success(statusCode.OK, responseMessage.READ_COMMENTLIST_SUCESS, comments));
  } catch (err) {
    next(err);
  }
}

//대댓글 조회
export const getCommentInComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { offset, limit } = req.query;

    //댓글 유무
    let comment = await commentService.readComment(commentId);
    if (comment === null) {
      return res.status(statusCode.NOT_FOUND)
        .send(util.fail(statusCode.NOT_FOUND, responseMessage.NO_COMMENT));
    }

    //쿼리실행
    let comments = await commentService.readCommentsInComment(commentId, Number(offset), Number(limit));

    return res.status(statusCode.OK)
      .send(util.success(statusCode.OK, responseMessage.READ_COMMENTLIST_SUCESS, comments));
  } catch (err) {
    next(err);
  }
}

//댓글 생성
export const postComment = async (req, res) => {
  try {
    const id = req.decoded;
    const postId = req.params.postId;
    const content = req.body.content;

    //입력값 확인
    if (content === undefined) {
      return res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    //게시글 유무
    let post = await postService.readPost(postId);
    if (post === null) {
      return res.status(statusCode.NOT_FOUND)
        .send(util.fail(statusCode.NOT_FOUND, responseMessage.NO_POST));
    }

    //쿼리실행
    let comment = await commentService.creatCommentInPost(postId, id, content);

    return res.status(statusCode.CREATED)
      .send(util.success(statusCode.CREATED, responseMessage.CREATE_COMMENT_SUCCESS, { id: comment._id }));
  } catch (err) {
    next(err);
  }
}

//대댓글 생성
export const postCommentInComment = async (req, res) => {
  try {
    const id = req.decoded;
    const { commentId, postId } = req.params;
    const content = req.body.content;

    //입력값 확인
    if (content === undefined) {
      return res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    //댓글 유무
    let comment = await commentService.readComment(commentId);
    if (comment === null) {
      return res.status(statusCode.NOT_FOUND)
        .send(util.fail(statusCode.NOT_FOUND, responseMessage.NO_COMMENT));
    }

    //쿼리실행
    let resultComment = await commentService.creatCommentInComment(postId, commentId, id, content);

    return res.status(statusCode.CREATED)
      .send(util.success(statusCode.CREATED, responseMessage.CREATE_COMMENT_SUCCESS, { id: resultComment._id }));
  } catch (err) {
    next(err);
  }
}

//대댓글or댓글 변경
export const putComment = async (req, res) => {
  try {
    const id = req.decoded;
    const commentId = req.params.commentId;
    const content = req.body.content;

    //입력값 확인
    if (content === undefined) {
      return res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    //댓글 유무
    let comment = await commentService.readComment(commentId);
    if (comment === null) {
      return res.status(statusCode.NOT_FOUND)
        .send(util.fail(statusCode.NOT_FOUND, responseMessage.NO_COMMENT));
    }

    // 작성자 불일치
    if (comment.userId.toString() !== id) {
      return res.status(statusCode.UNAUTHORIZED)
        .send(util.fail(statusCode.UNAUTHORIZED, responseMessage.PERMISSION_ERROR));
    }

    //쿼리실행
    await commentService.updateComment(commentId, id, content);

    return res.status(statusCode.OK)
      .send(util.success(statusCode.OK, responseMessage.UPDATE_COMMENT_SUCCESS));
  } catch (err) {
    next(err);
  }
}

//대댓글or댓글 삭제
export const deleteComment = async (req, res) => {
  try {
    const id = req.decoded;
    const commentId = req.params.commentId;
    const content = req.body.content;

    let comment = await commentService.readComment(commentId);

    //댓글 유무
    if (comment === null) {
      return res.status(statusCode.NOT_FOUND)
        .send(util.fail(statusCode.NOT_FOUND, responseMessage.NO_COMMENT));
    }

    // 작성자 불일치
    if (comment.userId.toString() !== id) {
      return res.status(statusCode.UNAUTHORIZED)
        .send(util.fail(statusCode.UNAUTHORIZED, responseMessage.PERMISSION_ERROR));
    }

    //쿼리실행
    await commentService.removeComment(commentId, id, content);

    return res.status(statusCode.OK)
      .send(util.success(statusCode.OK, responseMessage.DELETE_COMMENT_SUCCESS));
  } catch (err) {
    next(err);
  }
}
