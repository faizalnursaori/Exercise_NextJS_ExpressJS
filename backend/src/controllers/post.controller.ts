import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, body, userId } = req.body;

    // Log the incoming request body
    console.log("Request body:", req.body);

    // Check for required fields
    if (!title || !body || !userId) {
      return res.status(400).json({
        message: "All fields (title, body, userId) are required",
      });
    }

    // Log the fields before creating the post
    console.log("Creating post with:", { title, body, userId });

    const post = await prisma.post.create({
      data: {
        title,
        body,
        userId,
      },
    });

    console.log("Post created successfully:", post);

    return res.status(200).json({
      message: "success",
      data: post,
    });
  } catch (err) {
    console.error("Error creating post:", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    console.log("Fetching all posts");

    const posts = await prisma.post.findMany();

    console.log("Posts fetched successfully:", posts);

    return res.status(200).json({
      message: "success",
      data: posts,
    });
  } catch (err) {
    console.error("Error fetching posts:", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
