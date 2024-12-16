import { deleteExpense, getExpenseOnGroup, registerExpenceOnGroup, updateExpenseName  } from './../controllers/expensesController';
import express  from 'express'

export default (router: express.Router)=> {
    router.get('/group/:groupId/expenses' , getExpenseOnGroup )
    router.put('/expense/update/:expenseId', updateExpenseName)
    router.post('/group/:groupId/expense/register', registerExpenceOnGroup );
    router.delete('/expense/delete/:expenseId',deleteExpense)
}