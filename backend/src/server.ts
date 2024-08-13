import express, { Request, Response, Application } from "express";
import portfinder from "portfinder";
import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes";
import postRouter from "./routes/post.routes";
import cors from "cors";

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

// API versioning
const apiVersion = "/api/v1";

// Auth routes
app.use(`${apiVersion}/auth`, authRouter);

// User routes
app.use(`${apiVersion}/users`, userRouter);

app.use(`${apiVersion}/post`, postRouter);

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "API is running",
  });
});

portfinder.getPort((err, PORT) => {
  if (err) {
    console.error("Error finding available port:", err);
    return;
  }
  app.listen(PORT, () => {
    console.log(`Server is connected on port ${PORT}`);
  });
});
