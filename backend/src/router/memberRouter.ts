import {
  assigneUserToGroup,
  deleteUserFronGroup,
  getAllUsersByGroup,
  inviteNewUser,
  joinInvitedUser,
  getGroupUsingInviteToken,
} from "./../controllers/memberController";
import express from "express";

export default (router: express.Router) => {
  router.get("/:groupId/members", getAllUsersByGroup);
  router.post("/:userId/:groupId/join", assigneUserToGroup);
  router.post("/:userId/:groupId/invite", inviteNewUser);
  router.post("/:groupId/:userId/invitation/join", joinInvitedUser);
  router.delete("/:userId/:groupId/delete", deleteUserFronGroup);
  router.post("/:groupId/'token=:token/accept", getGroupUsingInviteToken);
};
