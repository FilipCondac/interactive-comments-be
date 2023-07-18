"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_1 = __importDefault(require("../models/post"));
const reply_1 = __importDefault(require("../models/reply"));
const router = express_1.default.Router();
router.post("/createPost", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, creator, creatorPicture } = req.body;
    if (!content) {
        res.status(400).json({ message: "Content is required" });
        return;
    }
    try {
        yield post_1.default.create({
            content: content,
            creator: creator,
            creatorPicture: creatorPicture,
            likes: [],
            createdAt: new Date(),
            replies: [],
        });
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(`Error: ${err.message}`);
        }
        else {
            console.error(`An unexpected error occurred: ${err}`);
        }
    }
    res.status(200).json({ message: "Post created" });
}));
router.get("/getPosts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield post_1.default.find({});
        res.status(200).json(posts);
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(`Error: ${err.message}`);
        }
        else {
            console.error(`An unexpected error occurred: ${err}`);
        }
    }
}));
router.post("/vote", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId, voteType, postType } = req.body;
    if (!postId || !voteType || !postType) {
        res.status(400).json({ message: "Post ID and vote type are required" });
        return;
    }
    try {
        if (postType === "post") {
            if (voteType === "like") {
                yield post_1.default.findByIdAndUpdate(postId, {
                    $addToSet: { likes: "test" },
                });
            }
            else if (voteType === "dislike") {
                yield post_1.default.findByIdAndUpdate(postId, {
                    $pull: { likes: "test" },
                });
            }
        }
        else if (postType === "reply") {
            if (voteType === "like") {
                yield reply_1.default.findByIdAndUpdate(postId, {
                    $addToSet: { likes: "test" },
                });
            }
            else if (voteType === "dislike") {
                yield reply_1.default.findByIdAndUpdate(postId, {
                    $pull: { likes: "test" },
                });
            }
        }
        res.status(200).json({ message: "Vote successful" });
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(`Error: ${err.message}`);
        }
        else {
            console.error(`An unexpected error occurred: ${err}`);
        }
    }
}));
router.post("/reply", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId, reply, creator, creatorPicture } = req.body;
    if (!postId || !reply) {
        res.status(400).json({ message: "Post ID and reply are required" });
        return;
    }
    try {
        yield reply_1.default.create({
            content: reply,
            creator: creator,
            creatorPicture: creatorPicture,
            likes: [],
            createdAt: new Date(),
            postID: postId,
        });
        //TODO: Add reply ID to post replies array
        res.status(200).json({ message: "Reply successful" });
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(`Error: ${err.message}`);
        }
        else {
            console.error(`An unexpected error occurred: ${err}`);
        }
    }
}));
router.get("/getReplies/:postId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const replies = yield reply_1.default.find({ postID: req.params.postId });
        res.status(200).json(replies);
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(`Error: ${err.message}`);
        }
        else {
            console.error(`An unexpected error occurred: ${err}`);
        }
    }
}));
exports.default = router;
