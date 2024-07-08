import { Role } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

type User = {
  email: string;
  name: string;
  password: string;
  role?: string;
};

type JWTPayload = {
  userId: string;
  email: string;
  role?: string;
};

declare module "express-serve-static-core" {
  interface Request {
    user?: JWTPayload;
  }
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer", "").trim();

    if (!token) {
      return res.status(401).send("Unauthorized");
    }
    console.log("Received token:", token);

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not set");
      return res.status(500).json({ message: "Internal server error" });
    }

    const verifiedUser = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;
    req.user = verifiedUser;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      console.error("Invalid token:", error.message);
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    } else if (error instanceof jwt.TokenExpiredError) {
      console.error("Token expired");
      return res.status(401).json({ message: "Unauthorized: Token expired" });
    } else {
      console.error("Unexpected error during token verification:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
};

export const adminGuard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("Logged in as:", req.user);
    if (req.user?.role !== "ADMIN") {
      return res.status(401).json({
        message: "Unauthorized: Not Admin",
      });
    }
    next();
  } catch (error) {
    console.error("Error in adminGuard:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
