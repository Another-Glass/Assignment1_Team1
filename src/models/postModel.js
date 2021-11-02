import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true
  },
  userId: {
    type: Number,
    required: true
  }
});

export default mongoose.model("Post", PostSchema);