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
    const post = await Post.findOne({
      where: {
        id: postId,
      },
    });
    return post;
  } catch (err) {
    throw err;
  }
}