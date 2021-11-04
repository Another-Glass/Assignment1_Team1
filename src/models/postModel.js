import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import Comment from './commentModel.js';
const autoIdSetter = require('./autoIdSetter').autoIdSetter;

const PostSchema = new mongoose.Schema({
  _id: Number,
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  categoryIdx: {
    type: Number, required: true
  },
  viewCount: {
    type: String, required: true
  }
}, { _id: false, timestamps: true, versionKey: false });

PostSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'postId',
});

autoIdSetter(PostSchema, mongoose, 'post', '_id');

export default mongoose.model("Post", PostSchema);