import express from 'express';
import isSellerAuth from '../app/middlewares/authSeller';
import upload from '../app/middlewares/uploadImage';

import createProduct from '../app/useCases/product/createProduct';
import deleteProduct from '../app/useCases/product/deleteProduct';
import listComments from '../app/useCases/product/listComments';
import listProduct from '../app/useCases/product/listProduct';
import listProducts from '../app/useCases/product/listProducts';
import updateProduct from '../app/useCases/product/updateProduct';

const productRoutes = express.Router()

productRoutes.get('/products', listProducts)

productRoutes.get('/product/:id', listProduct)

productRoutes.get('/product/:id/comments', listComments)

productRoutes.post('/product/new', isSellerAuth, upload.array('images', 3), createProduct)

productRoutes.post('/product/:id', isSellerAuth, upload.array('images', 3), updateProduct)

productRoutes.delete('/product/:id', isSellerAuth, deleteProduct)

export default productRoutes
