import { Express, NextFunction, Request, Response } from "express";
import { createProduct, getProducts } from "../database/products";
import { orderProduct } from "../database/order";

export const fetchProducts = async (req: Request, res: Response) => {
  try {
    const products = await getProducts();
    return res.status(200).send(products);
  } catch (error) {
    console.log(error);
  }
};

export const addProduct = async (req: Request, res: Response) => {
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
};

export const payForProduct = async (req: Request, res: Response) => {
  try {
    const { productName, barcode, quantity } = req.body;
    if (!productName || !barcode || !quantity) {
      res.status(400).json({
        status: "failed",
        message: "Bad request format",
      });
    }

    const order = await orderProduct({
      productName,
      barcode,
      quantity,
    });

    if (req.destroyed) {
      return console.log("Request aborted by the user after processing");
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
};
