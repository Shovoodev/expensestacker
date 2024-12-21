import express from 'express'
import { createExpenses, deleteExpensesById, getExpenses, getExpensesById, updateExpensesById } from './../db/expenses';
import { getGroupById } from './../db/group';

export const registerExpenceOnGroup = async (
    req: express.Request,
    res: express.Response
  ): Promise<any> => {
    try {
      const { groupId } = req.params;
      const { expensename } = req.body;
      
      if (!expensename ) {
        return res.status(400);
      }
      const group = await getGroupById(groupId);
  
      if (!group) {
        return res.status(404).json({ error: "group not found" });
      }
      const expense = await createExpenses({
        expensename,
        group_id : groupId
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
    const {groupId }= req.params;
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
    const { expenseId } = req.params
    const { expensename } = req.body;
      if (!expensename ) {
        return res.status(400);
      }
      const update = await updateExpensesById(expenseId , { expensename })
      if(update) {
       return  res.status(200).json(update)
      }
    }
      catch (error) {
        console.error(error);
        return res.status(500).json({ error: "An error occurred while updating the expense" });
      }
  }