import Post from '../models/postModel'

export const createPost = async (title, content, userId) => {
  try {
    const post = await Post.create({
      title,
      content,
      userId
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

export const updatePost = async (title, content, postId) => {
  try {
    const post = await Post.findOneAndUpdate(
      {
        _id: postId
      },
      {
        title,
        content
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

export const searchPost = async (categoryId, offset, limit, title, userId, content) => {
  try {
    let query = [];
    
    if(title) query = await Post.find({
      title: {$regex: title, $options: "i"},
      categoryIdx: Number(categoryId)
    })
    .sort({'createdAt': -1})
    .limit(Number(limit))
    .skip(Number(offset))

    if(userId) query = await Post.find({
      title: {$regex: userId, $options: "i"}
    })
    .sort({'createdAt': -1})
    .limit(Number(limit))
    .skip(Number(offset))

    if(content) query = await Post.find({
      title: {$regex: content, $options: "i"}
    })
    .sort({'createdAt': -1})
    .limit(Number(limit))
    .skip(Number(offset))
    
    if(title && content) query = await Post.find({
      title: {$regex: title, $options: "i"},
      content: {$regex: content, $options: "i"}
    })
    .sort({'createdAt': -1})
    .limit(Number(limit))
    .skip(Number(offset))

    return query;
  } catch (err) {
    throw err;
  }
}