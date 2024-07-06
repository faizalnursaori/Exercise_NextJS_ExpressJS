import express from "express";
import * as authController from "../controllers/auth.controller";

const router = express.Router();

// Route Handlers
router.post("/register", authController.register);

// Login
router.post("/login", authController.login);

export default router;
