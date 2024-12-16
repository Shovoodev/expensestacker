import express  from 'express'
import { deleteProduct, registerProductOnExpenses , getExpenseProducts , updateProduct, getSinglieProduct } from './../controllers/productController';

export default (router: express.Router)=> {
    router.post('/expense/:expenseId/product/register', registerProductOnExpenses);
    router.get('/expense/:expenseId/products', getExpenseProducts)
    router.put('/product/update/:productId', updateProduct)
    router.get(`/:productId/product` , getSinglieProduct)
    router.delete('/expense/:expenseId/product/delete/:productId',deleteProduct)
}