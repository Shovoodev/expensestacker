import { isAuthenticated } from "./../middlewares";
import {
  deleteExpense,
  getAllExpensesForFeed,
  getExpenseDoneByUser,
  getExpenseOnGroup,
  registerExpenceOnGroup,
  updateExpenseName,
  userExpenseRegisterCalculation,
} from "./../controllers/expensesController";
import express from "express";

export default (router: express.Router) => {
  router.get("/group/:groupId/expenses", getExpenseOnGroup);
  router.get("/group/hookexpenses", isAuthenticated, getExpenseDoneByUser);
  router.get("/allexpenses", getAllExpensesForFeed);
  router.put("/expense/update/:expenseId", updateExpenseName);
  router.get(
    "/calculation/singleUserExpenses",
    isAuthenticated,
    userExpenseRegisterCalculation
  );
  router.post(
    "/group/:groupId/expense/register",
    isAuthenticated,
    registerExpenceOnGroup
  );
  router.delete("/expense/delete/:expenseId", deleteExpense);
};
