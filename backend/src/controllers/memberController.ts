// @ts-nocheck
import { getUserByEmail, getsingleUserById, getUserById } from "./../db/user";
import {
  assigenUserOnGroup,
  getGroupById,
  updateGroupById,
} from "./../db/group";
import {
  createMember,
  deleteUserFronGroupId,
  findDuplicatedUsers,
  getMembers,
  getAllMembers,
  getUsers,
  updateMemberByGroupId,
} from "./../db/membership";
import express from "express";

export const assigneUserToGroup = async (
  /**
   * 1. check if user already exists in the user table/document
   * 2. if existès, just create a membership row with groupId,and userId
   * 3 if not, create user first, then do the steps above
   */
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { groupId, userId } = req.params;
    const user = await getUserById(userId);
    console.log({ user });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const group = await getGroupById(groupId);
    console.log({ group });

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    const newMember = await createMember({
      userId: userId,
      groupId: group._id,
    });
    console.log({ newMember });

    if (newMember) {
      return res.status(200).json(newMember);
    }

    if (user) {
      const updateUsers = await updateGroupById({
        userId: userId,
        groupId: group._id,
        users: [...users, userId],
      });
    }

    console.log({ updateUsers });
  } catch (error) {
    console.log(error);
  }
};

export const updateGroupUsers = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { groupId, userId } = req.params;
    const user = await getUserById(userId);
    console.log({ user });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const group = await getGroupById(groupId);
    console.log({ group });
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    if (user && group) {
      const userId = user._id.toString();
      const groupId = group._id.toString();
      console.log({ userId, groupId });

      const updateUser = await updateMemberByGroupId(groupId, {
        groupId: groupId,
        userId: userId,
      });
      res.status(200).json(updateUser);
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
    const { groupId } = req.params;

    const users = await getAllMembers(groupId);
    // const group = await getGroupById(groupId);
    // if (!group) {
    //   return res.status(404).json({ message: "Group not found" });
    // }
    // const users = group.users;

    const allUsers = await Promise.all(
      users.map(async (id) => {
        const user = await getUserById(id.userId);
        return user.username;
      })
    );
    console.log({ allUsers });
    return res.status(200).json({ allUsers });
  } catch (error) {
    console.error("Error fetching users by group:", error);
    return res.status(400);
  }
};
export const deleteUserFronGroup = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { groupId, userId } = req.params;
    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log({ user });

    const group = await getGroupById(groupId);
    console.log({ group });

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    if (group) {
      const allusers = user.users.map((id) => id.toString());
      console.log({ allusers });

      const deleteUser = await deleteUserFronGroupId(userId._id);
    }

    if (deleteUser) {
      return res.status(200).json(deleteUser);
    }
  } catch (error) {
    console.log(error);
  }
};
