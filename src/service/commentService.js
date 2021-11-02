import Comment from '../models/commentModel'
import Post from '../models/postModel'
const { ObjectId } = require('mongodb');

export const readCommentInPost = async (postId, offset, limit) => {
  try {
    const comments = await Comment.find({
        postId:postId
    })
    .sort({'createdAt': -1})
    .limit(limit)
    .skip(offset)

    return comments;
  } catch (err) {
    throw err;
  }
}

export const readCommentInComment = async (commentId, offset, limit) => {
  try {
    const comments = await Comment.find({
      parentCommentId:commentId
    })
    .sort({'createdAt': -1})
    .limit(limit)
    .skip(offset)

    return comments;
  } catch (err) {
    throw err;
  }
}


export const creatCommentInPost = async (postId, userId, content) => {
  try {
    const comment = await Comment.create({
        postId: postId,
        userId: userId,
        content: content,
    });

    return comment;
  } catch (err) {
    throw err;
  }
}

export const creatCommentInComment = async (postId, commentId, userId, content) => {
  try {
    const comment = await Comment.create({
      postId:postId,
      parentCommentId: ObjectId(commentId),
      userId: userId,
      content: content,
    });

    return comment;
  } catch (err) {
    throw err;
  }
}

export const updateComment = async (commentId, offset, limit) => {
  try {
    const comments = await Comment.find({
      parentCommentId:commentId
    })
    .sort({'createdAt': -1})
    .limit(limit)
    .skip(offset)

    return comments;
  } catch (err) {
    throw err;
  }
}

export const deleteComment = async (commentId, offset, limit) => {
  try {
    const comments = await Comment.find({
      parentCommentId:commentId
    })
    .sort({'createdAt': -1})
    .limit(limit)
    .skip(offset)

    return comments;
  } catch (err) {
    throw err;
  }
}

export const isCommentExists = async (commentId) => {
  try {
    const comment = await Comment.findById(commentId).lean()

    return comment;
  } catch (err) {
    throw err;
  }
}