import express from "express";
import * as postController from "../controllers/post.controller";
import { verifyToken, adminGuard } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/", postController.getAllPosts);

router.post("/post", verifyToken, adminGuard, postController.createPost);

export default router;
