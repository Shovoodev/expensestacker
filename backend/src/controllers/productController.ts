import express from "express";
import {
  createProduct,
  getProducts,
  getProductByExpenseId,
  updateProductById,
  getProductById,
} from "./../db/product";
import { deleteProductById } from "./../db/product";
import { getExpenses, getExpensesById } from "./../db/expenses";
import { getUserById } from "./../db/user";

export const registerProductOnExpenses = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { expenseId } = req.params;

    const { name, quantity, price } = req.body;
    if (!name || !quantity || !price) {
      return res.status(400);
    }
    const expense = await getExpensesById(expenseId);

    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }
    const product = await createProduct({
      name,
      quantity,
      price,
      expense_id: expenseId,
    });
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};

export const getExpenseProducts = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  const { expenseId, groupId } = req.params;
  const expense = await getExpensesById(expenseId);

  if (!expense) {
    return res.status(404).json({ error: "Expense not found" });
  }
  try {
    const products = await getProductByExpenseId(expenseId);

    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};
export const deleteProduct = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { productId } = req.params;

    const deleted = await deleteProductById(productId);

    return res.status(200).json(deleted);
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};

export const updateProduct = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { productId } = req.params;
    const { name, quantity, price } = req.body;

    if (!name || !quantity || !price) {
      return res.status(400);
    }

    const update = await updateProductById(productId, {
      name,
      quantity,
      price,
    });

    if (update) {
      return res.status(200).json(update);
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while updating the product" });
  }
};

export const getSinglieProduct = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  const { productId } = req.params;
  console.log({ productId });

  try {
    const product = await getProductById(productId);

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};
export const getAllExpensesOnGroup = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { groupId } = req.params;
    const groups = await getExpenses(groupId);
    if (!groups) {
      return res.status(404).json({ error: "Expense not found" });
    }
    // const expenses = await getProductByExpenseId(groups)
    const productValues = await Promise.all(
      groups.map(async (id) => {
        const expensesId = id._id.toString();
        const products = await getProductByExpenseId(expensesId);
        return products;
      })
    );
    const flatArray = productValues.flat();
    return res.status(200).json(flatArray);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "An error occurred" });
  }
};

export const getTotalExpenseByUser = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { groupId } = req.params;
    const groups = await getExpenses(groupId);

    if (!groups) {
      return res.status(404).json({ error: "Expense not found" });
    }

    let inTotal = 0;
    const productValues = await Promise.all(
      groups.map(async (id) => {
        const expensename = id.expensename;
        const createdTime = id.created_at;
        const done_user = await getUserById(id.done_By);
        if (!done_user) {
          return res.status(404).json({ error: "User not found" });
        }
        const done_By = done_user?.username;
        const expensesId = id._id.toString();
        const products = await getProductByExpenseId(expensesId);
        const totalCost = products.reduce(
          (sum, { price, quantity }) => sum + price * quantity,
          0
        );
        inTotal += totalCost;
        return { totalCost, expensename, createdTime, done_By, inTotal };
      })
    );
    const flatedArray = productValues.flat();
    return res.status(200).json(flatedArray);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
