"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
exports.default = mongoose_1.default.model("Post", postSchema);
