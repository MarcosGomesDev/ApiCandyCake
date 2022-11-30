import express from 'express';
import multer from 'multer';
import isSellerAuth from '../app/middlewares/authSeller';
import isUserAuth from '../app/middlewares/authUser';
import path from 'node:path';
import upload from '../app/middlewares/uploadImage';


import createProduct from '../app/useCases/product/createProduct';
import deleteProduct from '../app/useCases/product/deleteProduct';
import listComments from '../app/useCases/product/listComments';
import listProduct from '../app/useCases/product/listProduct';
import listProducts from '../app/useCases/product/listProducts';
import listProductsBySeller from '../app/useCases/product/listProductsBySeller';
import updateProduct from '../app/useCases/product/updateProduct';
import removeReplyRating from '../app/useCases/seller/removeReplyRating';
import replyRating from '../app/useCases/seller/replyRating';
import createComment from '../app/useCases/user/createComment';
import removeComment from '../app/useCases/user/removeComment';

const productRoutes = express.Router()

productRoutes.get('/products', listProducts)

productRoutes.get('/product/:id', listProduct)

productRoutes.get('/seller/:sellerId', isUserAuth, listProductsBySeller)

productRoutes.get('/product/:id/comments', listComments)

productRoutes.post('/product/:id/comment/new', isUserAuth, createComment)

productRoutes.post('/product/:id/comment/:commentId', isSellerAuth, replyRating)

productRoutes.post('/product/new', isSellerAuth, upload.array('images'), createProduct)

productRoutes.post('/product/:id', isSellerAuth, upload.array('images'), updateProduct)

productRoutes.delete('/product/:id/comment', isUserAuth, removeComment)

productRoutes.delete('/product/:id/comment/:commentId/reply/replyId', isSellerAuth, removeReplyRating)

productRoutes.delete('/product/:id', isSellerAuth, deleteProduct)

export default productRoutes
