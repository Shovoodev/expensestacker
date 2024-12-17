import { getUserById } from "./../db/user";
import { getGroupById } from "./../db/group";
import { createMember, getUsers } from "./../db/membership";
import express from "express";

export const assigneUserToGroup = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { groupId, userId } = req.params;
    const user = await getUserById(userId);
    const group = await getGroupById(groupId);
    const newUser = await createMember({
      userId: user._id,
      groupId: group._id,
    });
    if (newUser) {
      return res.status(200).json(newUser);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsersByGroup = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const groupId = req.params;
    console.log({ groupId });

    const users = getUsers(groupId);
    if (users) {
      return res.status(200).json(users);
    }
  } catch (error) {
    console.log(error);
  }
};
