import express  from 'express'
import { deleteProduct, registerProductOnExpenses , getExpenseProducts } from './../controllers/productController';


export default (router: express.Router)=> {
    router.post('/group/:groupId/expense/:expenseId/product/register', registerProductOnExpenses);
    router.get('/group/:groupId/expense/:expenseId/products', getExpenseProducts)
    router.delete('/:id/product/delete/:id',deleteProduct)
}