import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String
  },
}, { versionKey: false });

UserSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'userId',
});
UserSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'userid',
});

export default mongoose.model("User", UserSchema);