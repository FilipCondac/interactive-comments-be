import mongoose, { Document } from "mongoose";

const Schema = mongoose.Schema;

const replySchema = new Schema({
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
  postID: {
    type: String,
    required: true,
  },
});

export interface IReply extends Document {
  creator: string;
  creatorPicture: string;
  content: string;
  likes: Array<string>;
  createdAt: Date;
  postID: string;
}

export default mongoose.model<IReply>("Reply", replySchema);
