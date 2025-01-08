import express from "express";
import {
  createExpenses,
  deleteExpensesById,
  getAllExpenses,
  getExpenseByDoneBy,
  getExpenses,
  getExpensesById,
  updateExpensesById,
} from "./../db/expenses";

import { AuthenticatedRequest } from "./types";
import { getGroupById } from "./../db/group";
import { getMembersByGroupId, getMembersByUserId } from "./../db/membership";
import { getUserById } from "./../db/user";
import { getProductByExpenseId } from "./../db/product";

export const registerExpenceOnGroup = async (
  req: AuthenticatedRequest,
  res: express.Response
): Promise<any> => {
  try {
    const user = req.identity;
    const { groupId } = req.params;
    const { expensename } = req.body;

    if (!expensename) {
      return res.status(400);
    }
    const group = await getGroupById(groupId);

    if (!group) {
      return res.status(404).json({ error: "group not found" });
    }
    const expense = await createExpenses({
      expensename,
      done_By: user._id,
      group_id: groupId,
    });
    const data = { ...group, ...expense };

    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};

export const getExpenseOnGroup = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  const { groupId } = req.params;
  try {
    const data = await getExpenses(groupId);

    if (data) {
      return res.status(200).json(data);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Failed to fetch expenses" });
  }
};

export const deleteExpense = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { expenseId } = req.params;

    const deleted = await deleteExpensesById(expenseId);
    console.log({ deleted });

    return res.status(200).json(deleted);
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};
export const updateExpenseName = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { expenseId } = req.params;
    const { expensename } = req.body;
    if (!expensename) {
      return res.status(400);
    }
    const update = await updateExpensesById(expenseId, { expensename });
    if (update) {
      return res.status(200).json(update);
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while updating the expense" });
  }
};
export const getAllExpensesForFeed = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const data = await getAllExpenses();

    if (data) {
      return res.status(200).json(data);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Failed to fetch expenses" });
  }
};

export const userExpenseRegisterCalculation = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { groupId } = req.params;

    const expenseCalculation = await getMembersByGroupId(groupId);

    return res.status(200);
  } catch (error) {
    console.log(error);
  }
};
export const getExpenseDoneByUser = async (
  req: AuthenticatedRequest,
  res: express.Response
): Promise<any> => {
  try {
    const user = req.identity;
    console.log({ user });
    if (!user) {
      return res.status(403).json({ error: "User not authenticated" });
    }

    // const memberOfGroups = await getMembersByUserId(user.id);
    // console.log({ memberOfGroups });

    // const groups = await Promise.all(
    //   memberOfGroups.map(async (member) => {
    //     const memberId = member.groupId;
    //     console.log({ memberId });

    //     return await getGroupById(memberId);
    //   })
    // );

    return res.status(200);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Failed to fetch expenses" });
  }
};
export const isOwnerToGiveRightsToDelete = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  const { expenseId } = req.params;
  try {
    const data = await getExpensesById(expenseId);
    const doneUser = data.done_By;
    console.log({ doneUser });

    if (data) {
      return res.status(200).json(doneUser);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Failed to fetch expenses" });
  }
};
export const userTotalexpendeture = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { groupId } = req.params;
    let inTotal = 0;
    const members = await getMembersByGroupId(groupId);

    const expenseUsers = members.map(async (user) => {
      const userid = user.userId.toString();

      const expenseCalculation = await getExpenseByDoneBy(userid);
      const expenseId = expenseCalculation.map(async (id) => {
        const singleExpenseid = id._id.toString();
        const specificUser = await getExpenseByDoneBy(userid);
        const separatingUser = specificUser.map((id) => id.done_By);
        const expenseDetail = await getProductByExpenseId(singleExpenseid);
        const flatexpenses = expenseDetail.flat();

        const totalCost = flatexpenses.reduce(
          (sum, { price, quantity }) => sum + price * quantity,
          0
        );
        return (inTotal += totalCost);
      });
    });

    return res.status(200).json(inTotal);
  } catch (error) {
    console.log(error);
  }
};
