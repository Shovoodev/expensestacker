import { getAllUserInGroup } from "./../controllers/groupController";
import {
  assigneUserToGroup,
  deleteUserFronGroup,
  getAllUsersByGroup,
  updateGroupUsers,
} from "./../controllers/memberController";
import express from "express";

export default (router: express.Router) => {
  router.get("/:groupId/members", getAllUsersByGroup);
  router.post("/:userId/:groupId/join", assigneUserToGroup);
  router.get("/:groupId/members/users", getAllUserInGroup);
  router.put("/:userId/:groupId/update", updateGroupUsers);
  router.delete("/:userId/:groupId/delete", deleteUserFronGroup);
};
