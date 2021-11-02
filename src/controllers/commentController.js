import util from '../utils/util';
import statusCode from '../utils/statusCode';
import responseMessage from '../utils/responseMessage';


import {readCommentInComment, creatCommentInComment, creatCommentInPost, readCommentInPost, isCommentExists} from '../service/commentService';
import {readPost} from '../service/postService';

export const getCommentList = async(req, res) => {
  try {
    const { postId } = req.params;
    const { offset, limit } = req.query;

    if(postId === undefined) {
      return res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }
    
    let post = await readPost(postId);
    if(post === null) {
      return res.status(statusCode.NOT_FOUND)
        .send(util.fail(statusCode.NOT_FOUND, responseMessage.NO_POST));
    } 

    let comments = await readCommentInPost(postId, Number(offset), Number(limit));

    return res.status(statusCode.OK)
      .send(util.success(statusCode.OK, responseMessage.READ_COMMENTLIST_SUCESS, comments));
  } catch (err) {
    console.log(err);
    return res.status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR))
  }
}

export const getCommentInComment = async(req, res) => {
  try {
    const {commentId}= req.params;
    const { offset, limit } = req.query;

    let comments = await readCommentInComment(commentId, Number(offset), Number(limit));

    return res.status(statusCode.CREATED)
      .send(util.success(statusCode.CREATED, responseMessage.READ_COMMENT_IN_COMMENT_SUCESS,comments));
  } catch(err) {
    console.log(err);
    return res.status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR))
  }
}

export const postComment = async(req, res) => {
  try {
    const { id } = req.decoded;
    const postId = req.params.postId;
    const content = req.body.content;

    if(postId === undefined || content === undefined) {
      return res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    let post = await readPost(postId);
    if(post === null) {
      return res.status(statusCode.NOT_FOUND)
        .send(util.fail(statusCode.NOT_FOUND, responseMessage.NO_POST));
    }
    
    await creatCommentInPost(postId, id, content);

    return res.status(statusCode.CREATED)
      .send(util.success(statusCode.CREATED, responseMessage.CREATE_COMMENT_SUCCESS));
  } catch(err) {
    console.log(err);
    return res.status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.CREATE_COMMENT_FAIL))
  }
}

export const postCommentInComment = async(req, res) => {
  try {
    const { id } = req.decoded;
    const {commentId, postId}= req.params;
    const content = req.body.content;

    if(postId === undefined || content === undefined) {
      return res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    let post = await readPost(postId);
    if(post === null) {
      return res.status(statusCode.NOT_FOUND)
        .send(util.fail(statusCode.NOT_FOUND, responseMessage.NO_POST));
    }

    let comment = await isCommentExists(commentId);
    if(comment === null) {
      return res.status(statusCode.NOT_FOUND)
        .send(util.fail(statusCode.NOT_FOUND, responseMessage.NO_COMMENT));
    }
    await creatCommentInComment(postId, commentId, id, content);

    return res.status(statusCode.CREATED)
      .send(util.success(statusCode.CREATED, responseMessage.CREATE_COMMENT_SUCCESS));
  } catch(err) {
    console.log(err);
    return res.status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.CREATE_COMMENT_FAIL))
  }
}

export const updateComment = async(req, res) => {
  try {
    const { id } = req.decoded;
    const postId = req.params.postId;
    const content = req.body.content;

    if(postId === undefined) {
      return res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }
    
    let post = await readPost(postId);
    if(post === null) {
      return res.status(statusCode.NOT_FOUND)
        .send(util.fail(statusCode.NOT_FOUND, responseMessage.NO_POST));
    }
    
    await creatPostComment(postId, id, content);

    return res.status(statusCode.CREATED)
      .send(util.success(statusCode.CREATED, responseMessage.CREATE_COMMENT_SUCCESS));
  } catch(err) {
    console.log(err);
    return res.status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.CREATE_COMMENT_FAIL))
  }
}

export const deleteComment = async(req, res) => {
  try {
    const { id } = req.decoded;
    const postId = req.params.postId;
    const content = req.body.content;
    
    if(postId === undefined) {
      return res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }
    
    let post = postService.readPost(postId);
    if(post === null) {
      return res.status(statusCode.NOT_FOUND)
        .send(util.fail(statusCode.NOT_FOUND, responseMessage.NO_POST));
    }

    await commentService.creatPostComment(postId, id, content);

    return res.status(statusCode.CREATED)
      .send(util.success(statusCode.CREATED, responseMessage.CREATE_COMMENT_SUCCESS));
  } catch(err) {
    console.log(err);
    return res.status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.CREATE_COMMENT_FAIL))
  }
}
