import express from "express";
import * as userController from "../controllers/user.controller";
import * as authController from "../controllers/auth.controller";

const router = express.Router();

// Route Handlers
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUser);
router.post("/register", authController.register);
router.post("/login", authController.login);

// Add other routes for login, update, delete, etc.
// e.g., router.post("/login", userController.login);

export default router;
