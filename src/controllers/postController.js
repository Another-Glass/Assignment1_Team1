import util from '../utils/util';
import statusCode from '../utils/statusCode';
import responseMessage from '../utils/responseMessage';

import { createPost, readPost, updatePost, destroyPost, readPostList, increaseViewCount, searchPost } from '../service/postService';

//게시글 생성
export const postPost = async (req, res) => {
  try {
    const id = req.decoded;
    const { title, content, categoryIdx } = req.body;

    //입력값 확인
    if (title === undefined || content === undefined) {
      return res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    //쿼리실행
    let post = await createPost(title, content, categoryIdx, id);

    return res.status(statusCode.CREATED)
      .send(util.success(statusCode.CREATED, responseMessage.CREATE_POST_SUCCESS, { id: post._id }));
  } catch (err) {
    console.log(err);
    return res.status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.CREATE_POST_FAIL))
  }
}

//게시글 조회
export const getPost = async (req, res) => {
  try {
    const { postId } = req.params;

    //입력값 확인
    if (postId === undefined) {
      return res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    //쿼리 실행
    const post = await readPost(postId);

    //게시글 유무 확인
    if (post === null) {
      return res.status(statusCode.NOT_FOUND)
        .send(util.fail(statusCode.NOT_FOUND, responseMessage.NO_POST));
    }

    //조회수 변경
    if (!req.cookies[`postId${postId}`]) {
      console.log("increase viewCount");
      post.viewCount++;
      increaseViewCount(postId, post.viewCount);
    }

    //조회수 체크를 위한 쿠키
    return res.cookie(`postId${postId}`, postId, {
      maxAge: 1000 * 60 * 5
    }).status(statusCode.OK)
      .send(util.success(statusCode.OK, responseMessage.READ_POST_SUCCESS, post));
  } catch {
    console.log(err);
    return res.status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.READ_POST_FAIL))
  }
}

//게시글 수정
export const putPost = async (req, res) => {
  try {
    const id = req.decoded;
    const { postId } = req.params;
    const { title, content, categoryIdx } = req.body;

    //입력값 확인
    if (postId === undefined || (title === undefined && content === undefined && categoryIdx == undefined)) {
      return res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    //사전 쿼리
    const post = await readPost(postId);

    //게시글 유무 확인
    if (post === null) {
      return res.status(statusCode.NOT_FOUND)
        .send(util.fail(statusCode.NOT_FOUND, responseMessage.NO_POST));
    }

    //작성자 일치 확인
    if (post.userId.toString() !== id) {
      return res.status(statusCode.UNAUTHORIZED)
        .send(util.fail(statusCode.UNAUTHORIZED, responseMessage.PERMISSION_ERROR));
    }

    //쿼리 실행
    await updatePost(title, content, categoryIdx, postId);

    return res.status(statusCode.CREATED)
      .send(util.success(statusCode.CREATED, responseMessage.UPDATE_POST_SUCCESS));
  } catch (err) {
    console.log(err);
    return res.status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.UPDATE_POST_FAIL))
  }
}

//게시글 삭제
export const deletePost = async (req, res) => {
  try {
    const id = req.decoded;
    const { postId } = req.params;

    //입력값 확인
    if (postId === undefined) {
      return res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    //사전 쿼리
    const post = await readPost(postId);

    //게시글 유무
    if (post === null) {
      return res.status(statusCode.NOT_FOUND)
        .send(util.fail(statusCode.NOT_FOUND, responseMessage.NO_POST));
    }

    //작성자 일치 확인
    if (post.userId.toString() !== id) {
      return res.status(statusCode.UNAUTHORIZED)
        .send(util.fail(statusCode.UNAUTHORIZED, responseMessage.PERMISSION_ERROR));
    }

    //쿼리 실행
    await destroyPost(postId);

    return res.status(statusCode.OK)
      .send(util.success(statusCode.OK, responseMessage.DELETE_POST_SUCCESS));
  } catch (err) {
    console.log(err);
    return res.status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.DELETE_POST_FAIL))
  }
}

//게시글 검색
export const getPostList = async (req, res) => {
  try {
    const { offset, limit } = req.query;

    //입력값 확인
    if (offset === undefined || limit === undefined) {
      return res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    //쿼리 실행
    const postList = await readPostList(Number(offset), Number(limit));

    return res.status(statusCode.OK)
      .send(util.success(statusCode.OK, responseMessage.READ_POST_SUCCESS, postList));
  } catch (err) {
    console.log(err);
    return res.status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.READ_POST_FAIL))
  }
}

export const getSearchPost = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { offset, limit, title, content } = req.query;

    //입력값 확인
    if (offset === undefined || limit === undefined) {
      return res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    //쿼리 실행
    const postSearch = await searchPost(categoryId, offset, limit, title, content);

    return res.status(statusCode.OK)
      .send(util.success(statusCode.OK, responseMessage.READ_POST_SUCCESS, postSearch));
  } catch (err) {
    console.log(err);
    return res.status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.READ_POST_FAIL))
  }
}
