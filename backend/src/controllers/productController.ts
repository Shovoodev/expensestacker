import express from "express";
import {
  createProduct,
  getProducts,
  getProductByExpenseId,
  updateProductById,
} from "./../db/product";
import { deleteProductById } from "./../db/product";
import { getExpensesById } from "./../db/expenses";

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
      expense_id: expenseId
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
  const { expenseId  } = req.params;
  const expense = await getExpensesById(expenseId);
    

  if (!expense) {
    return res.status(404).json({ error: "Expense not found" });
  }
  try {

    const products = await getProductByExpenseId(expenseId);
    
    return res.status(200).json(products)
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
    console.log({productId});
    
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
  const { productId } = req.params
  const { name, quantity, price } = req.body;
  console.log({name , quantity , price});
    console.log({productId});
    
    if (!name || !quantity || !price) {
      return res.status(400);
    }

    const update = await updateProductById(productId , { name, quantity, price })
    if(update) {
     return  res.status(200).json(update)
    }
  }
    catch (error) {
      console.error(error);
      return res.status(500).json({ error: "An error occurred while updating the product" });
    }
}
