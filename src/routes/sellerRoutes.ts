import express from "express";

const sellerRoutes = express.Router();

import upload from "../app/middlewares/uploadImage";

import isSellerAuth from "../app/middlewares/authSeller";
import isUserAuth from "../app/middlewares/authUser";

import listSellers from "../app/useCases/seller/listSellers";
import createSeller from "../app/useCases/seller/createSeller";
import loginSeller from "../app/useCases/seller/loginSeller";
import changeSellerPassword from "../app/useCases/seller/changeSellerPassword";
import updateSeller from "../app/useCases/seller/updateSeller";
import deleteSeller from "../app/useCases/seller/deleteSeller";
import uploadSellerProfile from "../app/useCases/seller/uploadSellerProfile";
import forgotPasswordSeller from "../app/useCases/seller/forgotPasswordSeller";
import verifyTokenIsValid from "../app/useCases/seller/verifyTokenIsValid";
import listSeller from "../app/useCases/seller/listSeller";
import replyRating from "../app/useCases/seller/replyRating";
import removeReplyRating from "../app/useCases/seller/removeReplyRating";

sellerRoutes.get('/sellers', isUserAuth, listSellers)

sellerRoutes.get('/seller', isSellerAuth, listSeller)

sellerRoutes.post('/sign-up/seller', createSeller)

sellerRoutes.post('/sign-in/seller', loginSeller)

sellerRoutes.post('/forgotpassword/seller', forgotPasswordSeller)

sellerRoutes.post('/verifytoken', verifyTokenIsValid)

sellerRoutes.post('/rating/:id', isSellerAuth, replyRating)

sellerRoutes.patch('/update', isSellerAuth, updateSeller)

sellerRoutes.patch('/resetpassword/:token', changeSellerPassword)

sellerRoutes.patch('/seller/upload-profile', isSellerAuth, upload.single('avatar'), uploadSellerProfile)

sellerRoutes.delete('/rating/:id/reply', isSellerAuth, removeReplyRating)

sellerRoutes.delete('/seller/delete', isSellerAuth, deleteSeller)

export default sellerRoutes;
