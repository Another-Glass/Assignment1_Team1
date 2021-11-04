import Comment from '../models/commentModel.js'
import Post from '../models/postModel.js'
const { ObjectId } = require('mongodb');

export const readCommentsInPost = async (postId, offset, limit) => {
  try {
    const comments = await Comment.find({
      postId: postId
    })
      .sort({ 'createdAt': -1 })
      .limit(limit)
      .skip(offset)

    return comments;
  } catch (err) {
    throw err;
  }
}

export const readCommentsInComment = async (commentId, offset, limit) => {
  try {
    const comments = await Comment.find({
      parentCommentId: commentId
    })
      .sort({ 'createdAt': -1 })
      .limit(limit)
      .skip(offset)

    return comments;
  } catch (err) {
    throw err;
  }
}

export const readComment = async (commentId) => {
  try {
    const comment = await Comment.findById(commentId).lean()

    return comment;
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
      postId: postId,
      parentCommentId: ObjectId(commentId),
      userId: userId,
      content: content,
    });

    return comment;
  } catch (err) {
    throw err;
  }
}

export const updateComment = async (commentId, userId, content) => {
  try {
    const comments = await Comment.findByIdAndUpdate(commentId, { content: content }).lean();

    return comments;
  } catch (err) {
    throw err;
  }
}

export const removeComment = async (commentId) => {
  try {
    const comments = await Comment.findByIdAndDelete(commentId).lean();

    return comments;
  } catch (err) {
    throw err;
  }
}

