import util from '../utils/util';
import statusCode from '../utils/statusCode';
import responseMessage from '../utils/responseMessage';


import { readCommentsInPost, readCommentsInComment, creatCommentInComment, creatCommentInPost, readComment, updateComment, removeComment } from '../service/commentService';
import { readPost } from '../service/postService';

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
    let post = await readPost(postId);
    if (post === null) {
      return res.status(statusCode.NOT_FOUND)
        .send(util.fail(statusCode.NOT_FOUND, responseMessage.NO_POST));
    }

    //쿼리실행
    let comments = await readCommentsInPost(postId, Number(offset), Number(limit));

    return res.status(statusCode.OK)
      .send(util.success(statusCode.OK, responseMessage.READ_COMMENTLIST_SUCESS, comments));
  } catch (err) {
    console.log(err);
    return res.status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR))
  }
}

//대댓글 조회
export const getCommentInComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { offset, limit } = req.query;

    //댓글 유무
    let comment = await readComment(commentId);
    if (comment === null) {
      return res.status(statusCode.NOT_FOUND)
        .send(util.fail(statusCode.NOT_FOUND, responseMessage.NO_COMMENT));
    }

    //쿼리실행
    let comments = await readCommentsInComment(commentId, Number(offset), Number(limit));

    return res.status(statusCode.OK)
      .send(util.success(statusCode.OK, responseMessage.READ_COMMENTLIST_SUCESS, comments));
  } catch (err) {
    console.log(err);
    return res.status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR))
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
    let post = await readPost(postId);
    if (post === null) {
      return res.status(statusCode.NOT_FOUND)
        .send(util.fail(statusCode.NOT_FOUND, responseMessage.NO_POST));
    }

    //쿼리실행
    let comment = await creatCommentInPost(postId, id, content);

    return res.status(statusCode.CREATED)
      .send(util.success(statusCode.CREATED, responseMessage.CREATE_COMMENT_SUCCESS, { id: comment._id }));
  } catch (err) {
    console.log(err);
    return res.status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.CREATE_COMMENT_FAIL))
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
    let comment = await readComment(commentId);
    if (comment === null) {
      return res.status(statusCode.NOT_FOUND)
        .send(util.fail(statusCode.NOT_FOUND, responseMessage.NO_COMMENT));
    }

    //쿼리실행
    let resultComment = await creatCommentInComment(postId, commentId, id, content);

    return res.status(statusCode.CREATED)
      .send(util.success(statusCode.CREATED, responseMessage.CREATE_COMMENT_SUCCESS, { id: resultComment._id }));
  } catch (err) {
    console.log(err);
    return res.status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.CREATE_COMMENT_FAIL))
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
    let comment = await readComment(commentId);
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
    await updateComment(commentId, id, content);

    return res.status(statusCode.OK)
      .send(util.success(statusCode.OK, responseMessage.UPDATE_COMMENT_SUCCESS));
  } catch (err) {
    console.log(err);
    return res.status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.UPDATE_COMMENT_FAIL))
  }
}

//대댓글or댓글 삭제
export const deleteComment = async (req, res) => {
  try {
    const id = req.decoded;
    const commentId = req.params.commentId;
    const content = req.body.content;

    let comment = await readComment(commentId);

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
    await removeComment(commentId, id, content);

    return res.status(statusCode.OK)
      .send(util.success(statusCode.OK, responseMessage.DELETE_COMMENT_SUCCESS));
  } catch (err) {
    console.log(err);
    return res.status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.DELETE_COMMENT_FAIL))
  }
}
