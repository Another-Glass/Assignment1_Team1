import mongoose from "mongoose";
import { Schema } from 'mongoose'
const autoIdSetter = require('../utils/db/auto-id-setter').autoIdSetter;

const PostSchema = new mongoose.Schema({
  _id : Number,
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
  },
}, { _id : false, timestamps : true, versionKey: false });

autoIdSetter(PostSchema, mongoose, 'post', '_id');

export default mongoose.model("Post", PostSchema);