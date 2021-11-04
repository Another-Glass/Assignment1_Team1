import Post from '../models/postModel.js'

export const createPost = async (title, content, categoryIdx, userId) => {
  try {
    const post = await Post.create({
      title,
      content,
      userId,
      categoryIdx,
      viewCount: 0
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
    const post = await Post.findByIdAndDelete(postId);
    return post;
  } catch (err) {
    throw err;
  }
}

export const readPostList = async (offset, limit) => {
  try {
    const postList = await Post.find()
      .sort({ 'createdAt': -1 })
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


export const searchPost = async (categoryId, offset, limit, title, content) => {
  try {
    const query = [];

    if (title === undefined && content === undefined) return null;

    if (title) query.push({ title: { $regex: title } });
    if (content) query.push({ content: { $regex: content } });

    const results = await Post.find({
      $and: [{ $or: query }, { "categoryIdx": categoryId }]
    })
      .sort({ 'createdAt': -1 })
      .limit(Number(limit))
      .skip(Number(offset))
    return results;
  } catch (err) {
    throw err;
  }
}