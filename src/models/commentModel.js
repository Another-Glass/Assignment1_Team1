const mongoose = require('mongoose');


const CommentSchema = mongoose.Schema({
    postId: {
      type: Number,
      ref: 'Post',
      require: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    parentCommentId: { // 1
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
    content: {
      type: String,
      required: true,
    },
    depth: {
      type: Number,
      default: 0,
    }
  },
  { timestamps : true, versionKey: false },
);

CommentSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'parentCommentId',
});

CommentSchema.pre('remove', async function (next) {
  const comment = this;
  try {
    await Comment.deleteMany({ parentCommentId: comment._id });
    next();
  } catch (e) {
    next();
  }
});

export default mongoose.model("Comment", CommentSchema);