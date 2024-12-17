import {
  assigneUserToGroup,
  getAllUsersByGroup,
} from "./../controllers/memberController";
import express from "express";

export default (router: express.Router) => {
  router.get("/:groupId/members", getAllUsersByGroup);
  router.post("/:userId/:groupId/join", assigneUserToGroup);
};
