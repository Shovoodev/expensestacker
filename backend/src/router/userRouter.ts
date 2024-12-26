import { getAllUsers, getSingleUser } from "../controllers/userController";
import express from "express";

export default (router: express.Router) => {
  router.get("/users", getAllUsers);
  router.get("/:userId/user", getSingleUser);
};
