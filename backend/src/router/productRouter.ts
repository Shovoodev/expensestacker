import express  from 'express'
import { deleteProduct, getAllProducts, registerProductOnGroup , getGroupProducts } from './../controllers/productController';


export default (router: express.Router)=> {
    router.post('/:id/product/register', registerProductOnGroup);
    router.get('/:id/products',  getGroupProducts)
    router.delete('/:id/product/delete/:id',deleteProduct)
}