import express, { Request, Response, Application } from "express";
import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes";
import cors from "cors";

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

// API versioning
const apiVersion = "/api/v1";

// Auth routes
app.use(`${apiVersion}/auth`, authRouter);

// User routes
app.use(`${apiVersion}/users`, userRouter);

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "API is running",
  });
});

app.listen(PORT, () => {
  console.log(`Server is connected on port ${PORT}`);
});
