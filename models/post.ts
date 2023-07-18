import mongoose, { Document } from "mongoose";

const Schema = mongoose.Schema;

const postSchema = new Schema({
  creator: {
    type: String,
    required: true,
  },
  creatorPicture: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  likes: {
    type: Array,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  replies: {
    type: Array,
    required: true,
  },
});

export interface IPost extends Document {
  creator: string;
  creatorPicture: string;
  content: string;
  likes: Array<string>;
  createdAt: Date;
  replies: Array<string>;
}

export default mongoose.model<IPost>("Post", postSchema);
