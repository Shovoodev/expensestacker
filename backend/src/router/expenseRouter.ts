import { isAuthenticated } from "./../middlewares";
import {
  deleteExpense,
  getAllExpensesForFeed,
  getExpenseOnGroup,
  registerExpenceOnGroup,
  updateExpenseName,
  userExpenseRegister,
} from "./../controllers/expensesController";
import express from "express";

export default (router: express.Router) => {
  router.get("/group/:groupId/expenses", getExpenseOnGroup);
  router.get("/allexpenses", getAllExpensesForFeed);
  router.put("/expense/update/:expenseId", updateExpenseName);
  router.post(
    "/group/:groupId/expense/register",
    isAuthenticated,
    registerExpenceOnGroup
  );
  router.delete("/expense/delete/:expenseId", deleteExpense);
};
