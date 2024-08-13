import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.services";
import { loginSchema, registerSchema } from "../schema/user.schema";
import { setCookie } from "../utils/jwt.utils";

export const register = async (req: Request, res: Response) => {
  try {
    const result = registerSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: result.error.errors,
      });
    }

    const { email, name, password } = result.data;
    const user = await registerUser(email, name, password);
    res.status(201).json({ message: "Register success", user });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        message: "Validation failed",
        error: result.error.errors,
      });
    }

    const { email, password } = result.data;
    const { user, token } = await loginUser(email, password);

    setCookie(res, token);

    res.status(200).json({
      message: "Login success",
      data: user,
      token,
    });
  } catch (error) {
    console.log("Error login", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
