import express from "express";
import { AuthenticatedRequest } from "./types";
import {
  createGroup,
  deleteGroupById,
  getGroupById,
  getGroups,
  updateGroupById,
} from "./../db/group";
import { createMember } from "./../db/membership";
import { findMultipleUserById, getUserById } from "./../db/user";
export const registerUserGroup = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { userId } = req.params;

    const { name } = req.body;
    if (!name) {
      return res.status(400);
    }
    const group = await createGroup({
      name,
      owner_id: userId,
    });

    const member = await createMember({
      userId: userId,
      groupId: group._id,
      role: "admin",
      isActive: true,
    });

    return res.status(200).json({ ...group, member });
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};

// export const getAllGroups = async (
//   req: AuthenticatedRequest,
//   res: express.Response
// ): Promise<any> => {
//   try {
//     const user = req.identity;

//     console.log({ user });

//     const data = await getGroups(user.id);

//     if (data) {
//       return res.status(200).json(data);
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(400);
//   }
// };

export const getGroupsByUser = async (
  req: AuthenticatedRequest,
  res: express.Response
): Promise<any> => {
  try {
    const user = req.identity;

    const data = await getGroups(user.id);

    if (data) {
      return res.status(200).json(data);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
export const delteteGroup = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  console.log("here");
  try {
    const { groupId } = req.params;

    const deletedGroup = await deleteGroupById(groupId);
    if (!deletedGroup) {
      return res.status(404).json({ error: "Group not found" });
    }
    res.status(200).json(deletedGroup);
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};

export const updateGroupName = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { groupId } = req.params;
    const { name } = req.body;
    if (!name) {
      return res.status(400);
    }
    const update = await updateGroupById(groupId, { name });
    if (update) {
      return res.status(200).json(update);
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while updating the group" });
  }
};
export const getAllUserInGroup = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { groupId } = req.params;
    if (groupId) {
      const groupUser = await getGroupById(groupId);

      const usersIds = groupUser.users.map((id) => id.toString());
      const getUsers = await findMultipleUserById(usersIds);
      return res.status(200).json(getUsers);
    }
  } catch (error) {
    console.log(error);
  }
};
