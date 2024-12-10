import express from 'express'
import { createExpenses } from './../db/expenses';

export const registerGroup = async (
    req: express.Request,
    res: express.Response
  ): Promise<any> => {
    try {
      const { expense  } = req.body;
      if (!expense  ) {
        return res.sendStatus(400);
      }
      const group = await createExpenses({
        expense,
      })
      return res.status(200).json(expense).end();
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  };

