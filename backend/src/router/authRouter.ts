// @ts-nocheck
import express from "express";
import { login, register , logOut } from "../controllers/authController";
import { isAuthenticated } from "../middlewares";

export default (router: express.Router) => {
  router.post("/auth/register", register);
  router.post("/auth/login", login);
  router.post("/logout", logOut);
  router.get("/auth/user", isAuthenticated, async (req, res) => {
    console.log({ sss: req.identity });

    res.status(200).json({ ss: 2 });
  });

};

