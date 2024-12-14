import express from "express";
import { get, merge } from "lodash";
import { AuthenticatedRequest } from "controllers/types";
import { getGroupById } from "./../db/group";
import { getUserBySessionToken } from "./../db/user";

export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<any> => {
  try {
    const { id } = req.params;

    const currentUserId = get(req, "identity._id") as string;

    if (!currentUserId) {
      return res.status(403);
    }
    if (currentUserId.toString() !== id) {
      return res.status(403);
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};

export const isAuthenticated = async (
  req: AuthenticatedRequest,
  res: express.Response,
  next: express.NextFunction
): Promise<any> => {
  try {
    const sessionToken = req.cookies["VIDEO"];
    if (!sessionToken) {
      return res.status(403);
    }
    const existingUser = await getUserBySessionToken(sessionToken)
    if (!existingUser) {
      return res.status(403);
    }
    merge(req, { identity: existingUser });

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
