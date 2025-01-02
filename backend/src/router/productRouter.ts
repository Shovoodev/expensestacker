import express from "express";
import {
  deleteProduct,
  registerProductOnExpenses,
  getExpenseProducts,
  updateProduct,
  getSinglieProduct,
  getAllExpensesOnGroup,
  getTotalExpenseByUser,
} from "./../controllers/productController";
import { isAuthenticated } from "./../middlewares";

export default (router: express.Router) => {
  router.post(
    "/expense/:expenseId/product/register",
    registerProductOnExpenses
  );
  router.get("/:groupId/expense/:expenseId/products", getExpenseProducts);
  router.get("/:groupId/products", getAllExpensesOnGroup);
  router.get("/:groupId/totalcostofproducts", getTotalExpenseByUser);
  router.put("/product/update/:productId", updateProduct);
  router.get(`/:productId/product`, getSinglieProduct);
  router.delete(
    "/expense/:expenseId/product/delete/:productId",
    isAuthenticated,
    deleteProduct
  );
};
