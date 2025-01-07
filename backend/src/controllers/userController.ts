import express from "express";

import { deleteUserById, getUserById, getUsers } from "../db/user";
import { createUserDetail, getUserByUserEmail } from "./../db/detailUser";
import { getGroupById } from "./../db/group";
import { AuthenticatedRequest } from "./types";
import { log } from "handlebars";
import { getMembersByGroupId } from "./../db/membership";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const users = await getUsers();
    return res.status(200).json(users).end();
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUserById(id);
    return res.sendStatus(200).json(deletedUser);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const updateUser = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { username } = req.body;
    const { id } = req.params;

    const user = await getUserById(id);
    user.username = username;
    await user.save();
    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};

export const signOutUser = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};
export const getSingleUser = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { userId } = req.params;
    const user = await getUserById(userId);
    if (!user) {
      console.log("no user found");
    }
    if (user) {
      return res.status(200).json(user);
    }
  } catch (error) {
    console.log(error);
  }
};
export const registerUserDetails = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  const { firstname, lastname, bio, phone, address, email } = req.body;
  try {
    if (!firstname || !bio || !lastname || !phone || !address) {
      return res.status(400);
    }
    const existingUser = await getUserByUserEmail(email);
    console.log(existingUser);

    if (existingUser) {
      return res.status(400).json({ message: "Already registrated user" });
    }
    const user = await createUserDetail({
      firstname,
      lastname,
      email,
      bio,
      address,
      phone,
    });
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};
export const getUserDetails = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { email } = req.body;
    const userDetail = await getUserByUserEmail(email);
    return res.status(200).json(userDetail);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
export const getSingleUserForOwner = async (
  req: AuthenticatedRequest,
  res: express.Response
): Promise<any> => {
  try {
    const user = req.identity;
    const userid = user._id.toString();
    return res.status(200).json(userid);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
export const getOwnerOfGroup = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { groupId } = req.params;
    const userDetail = await getGroupById(groupId);
    const ownerId = userDetail?.owner_id;
    return res.status(200).json(ownerId);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
