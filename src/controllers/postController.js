import util from '../utils/util';
import statusCode from '../utils/statusCode';
import responseMessage from '../utils/responseMessage';

import { createPost, readPost, updatePost, destroyPost, readPostList, increaseViewCount } from '../service/postService';

export const postPost = async(req, res) => {
  try {
    const id = req.decoded;
    const {title, content, categoryIdx} = req.body;

    if(title === undefined || content === undefined) {
      return res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }
    
    await createPost(title, content, categoryIdx, id);
    
    return res.status(statusCode.CREATED)
      .send(util.success(statusCode.CREATED, responseMessage.CREATE_POST_SUCCESS));
  } catch(err) {
    console.log(err);
    return res.status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.CREATE_POST_FAIL))
  }
}

export const getPost = async(req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.decoded;
    
    if(postId === undefined) {
      return res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }
    
    const post = await readPost(postId);

    if(post === null) {
      return res.status(statusCode.NOT_FOUND)
        .send(util.fail(statusCode.NOT_FOUND, responseMessage.NO_POST));
    }
    if(post.userId.toString() !== userId) {
      post.viewCount++;
      increaseViewCount(postId, post.viewCount);
    }
    return res.status(statusCode.OK)
      .send(util.success(statusCode.OK, responseMessage.READ_POST_SUCCESS, post));
  } catch {
    return res.status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.READ_POST_FAIL))
  }
}

export const putPost = async(req, res) => {
  try {
    const id = req.decoded;
    const { postId } = req.params;
    const { title, content, categoryIdx } = req.body;

    if(postId === undefined || (title === undefined && content === undefined && categoryIdx)) {
      return res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }
    
    const findUserId = await readPost(postId);
    
    
    if(findUserId === null) {
      return res.status(statusCode.NOT_FOUND)
        .send(util.fail(statusCode.NOT_FOUND, responseMessage.NO_POST));
    } 
    if(findUserId.userId.toString() !== id) {
      return res.status(statusCode.UNAUTHORIZED)
        .send(util.fail(statusCode.UNAUTHORIZED, responseMessage.PERMISSION_ERROR));
    } 
    
    await updatePost(title, content, categoryIdx, postId);
    
    return res.status(statusCode.CREATED)
      .send(util.success(statusCode.CREATED, responseMessage.UPDATE_POST_SUCCESS));
  } catch(err) {
    return res.status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.UPDATE_POST_FAIL))
  }
}

export const deletePost = async(req, res) => {
  try {
    const id = req.decoded;
    const { postId } = req.params;
    
    if(postId === undefined) {
      return res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }
    
    const findUserId = await readPost(postId);

    if(findUserId === null) {
      return res.status(statusCode.NOT_FOUND)
        .send(util.fail(statusCode.NOT_FOUND, responseMessage.NO_POST));
    } 

    if(findUserId.userId.toString() !== id) {
      return res.status(statusCode.UNAUTHORIZED)
        .send(util.fail(statusCode.UNAUTHORIZED, responseMessage.PERMISSION_ERROR));
    } 
    
    await destroyPost(postId);

    return res.status(statusCode.OK)
      .send(util.success(statusCode.OK, responseMessage.DELETE_POST_SUCCESS));
  } catch {
    return res.status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.DELETE_POST_FAIL))
  }
}

export const getPostList = async(req, res) => {
  try {
    const { offset, limit } = req.query;
    
    if(offset === undefined || limit === undefined) {
      return res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    const postList = await readPostList(Number(offset), Number(limit));
    
    return res.status(statusCode.OK)
      .send(util.success(statusCode.OK, responseMessage.READ_POST_SUCCESS, postList));
  } catch {
    return res.status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.READ_POST_FAIL))
  }
}