import Post from '../models/postModel'

export const createPost = async (title, content, categoryIdx, userId) => {
  try {
    const post = await Post.create({
      title,
      content,
      userId,
      categoryIdx,
      viewCount:0
    });
    return post;
  } catch (err) {
    throw err;
  }
}

export const readPost = async (postId) => {
  try {
    const post = await Post.findById({
      _id: postId
    });
    return post;
  } catch (err) {
    throw err;
  }
}

export const updatePost = async (title, content, categoryIdx, postId) => {
  try {
    const post = await Post.findOneAndUpdate(
      {
        _id: postId
      },
      {
        title,
        content,
        categoryIdx
      }
    );
    return post;
  } catch (err) {
    throw err;
  }
}

export const destroyPost = async (postId) => {
  try {
    const post = await Post.findOneAndRemove(
      {
        _id: postId
      }
    );
    return post;
  } catch (err) {
    throw err;
  }
}

export const readPostList = async (offset, limit) => {
  try {
    const postList = await Post.find()
      .sort({'createdAt': -1})
      .limit(limit)
      .skip(offset)
    return postList;
  } catch (err) {
    throw err;
  }
}

export const increaseViewCount = async (postId, viewCount) => {
  try {
    const post = await Post.findOneAndUpdate(
      {
        _id: postId
      },
      {
        viewCount
      }
    );
    return post;
  } catch (err) {
    throw err;
  }
}