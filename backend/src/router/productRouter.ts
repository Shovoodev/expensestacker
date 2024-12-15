import express  from 'express'
import { deleteProduct, registerProductOnExpenses , getExpenseProducts , updateProduct } from './../controllers/productController';

export default (router: express.Router)=> {
    router.post('/expense/:expenseId/product/register', registerProductOnExpenses);
    router.get('/expense/:expenseId/products', getExpenseProducts)
    router.put('/:productId/product/update', updateProduct)
    router.delete('/expense/:expenseId/product/delete/:productId',deleteProduct)
}