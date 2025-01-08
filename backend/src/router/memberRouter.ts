import {
  assigneUserToGroup,
  deleteUserFronGroup,
  getAllUsersByGroup,
  inviteNewUser,
  joinInvitedUser,
  getGroupUsingInviteToken,
  getAllSpendTotal,
} from "./../controllers/memberController";
import express from "express";

export default (router: express.Router) => {
  router.get("/:groupId/members", getAllUsersByGroup);
  router.get("/:groupId/calculationoftotalspend", getAllSpendTotal);
  router.post("/:userId/:groupId/join", assigneUserToGroup);
  router.post("/:userId/:groupId/invite", inviteNewUser);
  router.post("/invitation/join/:token", joinInvitedUser);
  router.delete("/:userId/:groupId/delete", deleteUserFronGroup);
  router.post("/:groupId/token=:token/accept", getGroupUsingInviteToken);
};
