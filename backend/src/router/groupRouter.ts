import express from "express";
import {
  delteteGroup,
  getGroupsByUser,
  groupExpenseCalculation,
  registerUserGroup,
  updateGroupName,
} from "./../controllers/groupController";
import { isAuthenticated } from "../middlewares";

export default (router: express.Router) => {
  router.get("/groups", isAuthenticated, getGroupsByUser);
  router.post("/:userId/group/register", registerUserGroup);
  router.put("/group/update/:groupId", updateGroupName);
  router.delete("/group/delete/:groupId", delteteGroup);
  router.get("/:groupId/expenses/calculation", groupExpenseCalculation);
};
