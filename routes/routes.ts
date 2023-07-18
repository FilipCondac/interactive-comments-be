import express, { Request, Response, Router } from "express";
import Post from "../models/post";
import Reply from "../models/reply";

const router: Router = express.Router();

router.post("/createPost", async (req: Request, res: Response) => {
  const { content, creator, creatorPicture } = req.body;

  if (!content) {
    res.status(400).json({ message: "Content is required" });
    return;
  }

  try {
    await Post.create({
      content: content,
      creator: creator,
      creatorPicture: creatorPicture,
      likes: [],
      createdAt: new Date(),
      replies: [],
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(`Error: ${err.message}`);
    } else {
      console.error(`An unexpected error occurred: ${err}`);
    }
  }

  res.status(200).json({ message: "Post created" });
});

router.get("/getPosts", async (req: Request, res: Response) => {
  try {
    const posts = await Post.find({});
    res.status(200).json(posts);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(`Error: ${err.message}`);
    } else {
      console.error(`An unexpected error occurred: ${err}`);
    }
  }
});

router.post("/vote", async (req: Request, res: Response) => {
  const { postId, voteType, postType } = req.body;

  if (!postId || !voteType || !postType) {
    res.status(400).json({ message: "Post ID and vote type are required" });
    return;
  }

  try {
    if (postType === "post") {
      if (voteType === "like") {
        await Post.findByIdAndUpdate(postId, {
          $addToSet: { likes: "test" },
        });
      } else if (voteType === "dislike") {
        await Post.findByIdAndUpdate(postId, {
          $pull: { likes: "test" },
        });
      }
    } else if (postType === "reply") {
      if (voteType === "like") {
        await Reply.findByIdAndUpdate(postId, {
          $addToSet: { likes: "test" },
        });
      } else if (voteType === "dislike") {
        await Reply.findByIdAndUpdate(postId, {
          $pull: { likes: "test" },
        });
      }
    }

    res.status(200).json({ message: "Vote successful" });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(`Error: ${err.message}`);
    } else {
      console.error(`An unexpected error occurred: ${err}`);
    }
  }
});

router.post("/reply", async (req: Request, res: Response) => {
  const { postId, reply, creator, creatorPicture } = req.body;

  if (!postId || !reply) {
    res.status(400).json({ message: "Post ID and reply are required" });
    return;
  }

  try {
    await Reply.create({
      content: reply,
      creator: creator,
      creatorPicture: creatorPicture,
      likes: [],
      createdAt: new Date(),
      postID: postId,
    });

    //TODO: Add reply ID to post replies array

    res.status(200).json({ message: "Reply successful" });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(`Error: ${err.message}`);
    } else {
      console.error(`An unexpected error occurred: ${err}`);
    }
  }
});

router.get("/getReplies/:postId", async (req: Request, res: Response) => {
  try {
    const replies = await Reply.find({ postID: req.params.postId });
    res.status(200).json(replies);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(`Error: ${err.message}`);
    } else {
      console.error(`An unexpected error occurred: ${err}`);
    }
  }
});
export default router;
