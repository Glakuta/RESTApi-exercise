import { error } from "console";
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.get("/products", (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

const mongo_url = process.env.MONGO_URL;

mongoose.Promise = Promise;
mongoose.connect(mongo_url);

mongoose.connection.on("error", (error: Error) => console.log("Error!"));
