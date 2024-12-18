// @ts-nocheck
import { getUserByEmail, getUserById } from "./../db/user";
import { assigenUserOnGroup, getGroupById, updateGroup } from "./../db/group";
import { createMember, findDuplicatedUsers, getUsers } from "./../db/membership";
import express from "express";

export const assigneUserToGroup = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { groupId, userId } = req.params;
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const group = await getGroupById(groupId);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    const newUser = await createMember({
      userId: userId,
      groupId: group._id,
    });
    console.log();

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
    const { groupId } = req.params;
    const group = await getGroupById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    console.log({group});
    const users = await findDuplicatedUsers()
    
    if(users){
      const update = await updateGroup(group._id , {
        users : users
      })
      console.log({update});
      
      return res.status(200).json({update})
    }
    
  } catch (error) {
    console.error("Error fetching users by group:", error);
    return res.status(400);
  }
};
