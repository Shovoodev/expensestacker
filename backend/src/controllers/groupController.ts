import express from "express";
import { AuthenticatedRequest } from "./types";
import {
  createGroup,
  deleteGroupById,
  getGroupById,
  getGroups,
} from "./../db/group";
import { getUserById } from "./../db/user";
export const registerUserGroup = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { userId } = req.params; //ai id ta always null ase
    console.log(userId);

    const { name } = req.body;
    if (!name) {
      return res.status(400);
    }
    const group = await createGroup({
      name,
      owner_id: userId,
    });
    console.log({ group });

    return res.status(200).json(group);
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
    const { id } = req.params;
    console.log({ id });

    const deletedGroup = await deleteGroupById(id);
    if (!deletedGroup) {
      return res.status(404).json({ error: "Group not found" });
    }
    res.status(200).json(deletedGroup);
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};
