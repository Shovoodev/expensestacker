import express from "express";
import { createGroup, deleteGroupById, getGroupById, getGroups } from "./../db/group";
export const registerGroup = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.sendStatus(400);
    }
    const group = await createGroup({
      name,
    });
    return res.status(200).json(group).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getAllGroupts = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const groups = await getGroups();
    return res.status(200).json(groups).end();
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
}
export const getGroupt = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  const {id} = req.params
  try {
    const groups = await getGroupById(id);
    return res.status(200).json(groups).end();
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
