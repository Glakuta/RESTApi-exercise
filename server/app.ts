import { error } from "console";
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { createProduct, getProducts } from "./database/products";
import { orderProduct } from "./database/order";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.get("/products", async (req: Request, res: Response) => {
  try {
    const products = await getProducts();
    return res.status(200).send(products);
  } catch (error) {
    console.log(error);
  }
});

app.post("/products", async (req: express.Request, res: express.Response) => {
  try {
    const { name, price, barcode } = req.body;

    if (!name || !price || !barcode) {
      return res.sendStatus(400);
    }
    const product = await createProduct({
      name,
      price,
      barcode,
    });
    return res.status(200).json(product).end();
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
      message: "bad request",
    });
  }
});

app.post(
  "/products/pay",
  async (req: express.Request, res: express.Response) => {
    try {
      const { productName, barcode, quantity } = req.body;
      if (!productName || !barcode || !quantity) {
        res.status(400).json({
          status: "failed",
          message: "Bad request format",
        });
      }
      if (req.destroyed) {
        console.log("Request aborted by the user");
        return;
      }

      const order = await orderProduct({
        productName,
        barcode,
        quantity,
      });

      if (req.destroyed) {
        console.log("Request aborted by the user after processing");
        return;
      }
      return res
        .status(200)
        .json({ status: 200, message: "the product has been ordered" })
        .end();
    } catch (error) {
      console.log(error);
      res.status(400).json({
        status: "failed",
        message: "bad request",
      });
    }
  }
);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

const mongo_url = process.env.MONGO_URL as string;

mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(() => {
    console.log("Couldn't connect to MongoDB");
  });
