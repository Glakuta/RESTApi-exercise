import express from "express";
import usersRoutes from "./users.routes";
import productsRoutes from "./products.routes";

const router = express.Router();

export default (): express.Router => {
  usersRoutes(router);
  productsRoutes(router);

  return router;
};
