import { isAuthenticated } from "./../middlewares";
import {
  deleteExpense,
  getAllExpensesForFeed,
  getExpenseDoneByUser,
  getExpenseOnGroup,
  isOwnerToGiveRightsToDelete,
  registerExpenceOnGroup,
  updateExpenseName,
  userExpenseRegisterCalculation,
  userTotalexpendeture,
} from "./../controllers/expensesController";
import express from "express";

export default (router: express.Router) => {
  router.get("/group/:groupId/expenses", getExpenseOnGroup);
  router.get("/group/hookexpenses", isAuthenticated, getExpenseDoneByUser);
  router.get("/allexpenses", getAllExpensesForFeed);
  router.put("/expense/update/:expenseId", updateExpenseName);
  router.get("/:groupId/calculationsingle", userExpenseRegisterCalculation);
  router.post(
    "/group/:groupId/expense/register",
    isAuthenticated,
    registerExpenceOnGroup
  );
  router.delete("/expense/delete/:expenseId", deleteExpense);
  router.get("/:expenseId/isitowner", isOwnerToGiveRightsToDelete);
  // to do the expenses id
  router.get("/:groupId/total/spend", userTotalexpendeture);
};
