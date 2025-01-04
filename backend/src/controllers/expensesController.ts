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
  req: AuthenticatedRequest,
  res: express.Response
): Promise<any> => {
  try {
    const user = req.identity;
    // const { groupId } = req.params;
    console.log({ user });
    //const groups = await getExpenseByDoneBy(user.username);
    // console.log({ groups });

    // if (!groups) {
    //   return res.status(404).json({ error: "Expense not found" });
    // }

    return res.status(200).json();
  } catch (error) {
    console.log(error);
  }
};
// this is for test
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
