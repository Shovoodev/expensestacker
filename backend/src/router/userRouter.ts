import { isAuthenticated } from "./../middlewares";
import {
  getAllUsers,
  getOwnerOfGroup,
  getSingleUser,
  getSingleUserForOwner,
  getUserDetails,
  registerUserDetails,
} from "../controllers/userController";
import express from "express";

export default (router: express.Router) => {
  router.get("/users", getAllUsers);
  router.post("/userdetails", getUserDetails);
  router.get("/:userId/user", getSingleUser);
  router.post("/user/details", registerUserDetails);
  router.get("/:groupId/isowner", getOwnerOfGroup);
  router.get("/isowner", isAuthenticated, getSingleUserForOwner);
};
