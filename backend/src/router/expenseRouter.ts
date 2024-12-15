import { deleteExpense, getExpenseOnGroup, registerExpenceOnGroup  } from './../controllers/expensesController';
import express  from 'express'

export default (router: express.Router)=> {
    router.get('/group/:groupId/expenses' , getExpenseOnGroup )
    router.post('/group/:groupId/expense/register', registerExpenceOnGroup );
    router.delete('/expense/delete/:expenseId',deleteExpense)
}