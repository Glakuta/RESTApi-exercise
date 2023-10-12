import express from "express";
import { login, logout, registerUser } from "../controllers/users";

export default (router: express.Router) => {
  router.post("/auth/register", registerUser);
  router.post("/auth/login", login);
  router.post("/auth/logout", logout);
};
