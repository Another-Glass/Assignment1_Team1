import util from '../utils/util';
import statusCode from '../utils/statusCode';
import responseMessage from '../utils/responseMessage';

import { createPost, readPost, updatePost, destroyPost, readPostList } from '../service/postService';

export const postPost = async(req, res) => {
  try {
    const { id } = req.decoded;
    const {title, content} = req.body;

    if(title === undefined || content === undefined) {
      return res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }
    
    await createPost(title, content, id);
    
    return res.status(statusCode.CREATED)
      .send(util.success(statusCode.CREATED, responseMessage.CREATE_POST_SUCCESS));
  } catch {
    return res.status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.CREATE_POST_FAIL))
  }
}
