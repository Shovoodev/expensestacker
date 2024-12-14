import express from "express";
import {
  createProduct,
  getProducts,
  getProductByExpenseId,
} from "./../db/product";
import { deleteProductById } from "./../db/product";
import { getExpensesById } from "./../db/expenses";
import { getGroupById } from "./../db/group";

export const registerProductOnExpenses = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { groupId , expenseId } = req.params;
    const { name, quantity, price } = req.body;
    if (!name || !quantity || !price) {
      return res.status(400);
    }
    const expense = await getExpensesById(expenseId);
    

    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }
    const group = await getGroupById(groupId);

    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }
    const product = await createProduct({
      name,
      quantity,
      price,
      group_id : groupId,
      expense_id: expenseId
    });
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};

export const getAllProducts = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const products = await getProducts();
    return res.status(200).json(products).end();
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
    const { id } = req.params;

    const deleted = await deleteProductById(id);

    return res.status(200).json(deleted);
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};
export const getExpenseProducts = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  const { expenseId , groupId } = req.params;
  
  const expense = await getExpensesById(expenseId);
    

  if (!expense) {
    return res.status(404).json({ error: "Expense not found" });
  }
  const group = await getGroupById(groupId);

  if (!group) {
    return res.status(404).json({ error: "Group not found" });
  }

  try {

    const products = await getProductByExpenseId(expenseId);
    
    return res.status(200).json(products).end();
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};
