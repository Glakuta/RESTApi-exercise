import express from "express";
import {
  addProduct,
  fetchProducts,
  payForProduct,
} from "../controllers/products";

export default (router: express.Router) => {
  router.get("/products", fetchProducts);
  router.post("/products", addProduct);
  router.post("/products/pay", payForProduct);
};
