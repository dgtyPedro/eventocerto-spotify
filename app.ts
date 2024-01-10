import express from "express";
import { Router, Request, Response } from "express";
import { callback } from "./src/config/spotify.config";

const app = express();
const port = 3000;

const userRouter = require("./src/api/user.api");

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/api/v1/user", userRouter);

app.use("/callback", callback);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
