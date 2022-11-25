import express from "express";

import isAuthUser from "../app/middlewares/authUser";
import upload from "../app/middlewares/uploadImage";

import createUser from "../app/useCases/user/createUser";
import listUsers from "../app/useCases/user/listUsers";
import updateUser from "../app/useCases/user/updateUser";
import loginUser from "../app/useCases/user/loginUser";
import forgotPasswordUser from "../app/useCases/user/forgotPasswordUser";
import verifyTokenIsValid from "../app/useCases/user/verifyTokenIsValid";
import changePassword from "../app/useCases/user/changeUserPassword";
import uploadProfile from "../app/useCases/user/uploadProfile";
import deleteUser from "../app/useCases/user/deleteUser";
import listFavorites from "../app/useCases/user/listFavorites";
import removeToFavorites from "../app/useCases/user/removeToFavorites";
import createComment from "../app/useCases/user/createComment";
import removeComment from "../app/useCases/user/removeComment";
import searchProduct from "../app/useCases/user/searchProduct";

const userRoutes = express.Router();

userRoutes.get('/users', isAuthUser, listUsers)

userRoutes.get('/favorites', isAuthUser, listFavorites)

userRoutes.get('/search', searchProduct)

userRoutes.post('/sign-up/user', createUser)

userRoutes.post('/sign-in/user', loginUser)

userRoutes.post('/forgotpassword/user', forgotPasswordUser)

userRoutes.post('/verifytoken', verifyTokenIsValid)

userRoutes.post('/product/:id/rating/new', isAuthUser, createComment)

userRoutes.patch('/update', isAuthUser, updateUser)

userRoutes.patch('/resetpassword/:token', changePassword)

userRoutes.patch('/user/upload-profile', isAuthUser, upload.single('avatar'), uploadProfile)

userRoutes.delete('/product/:id/rating', isAuthUser, removeComment)

userRoutes.delete('/favorites/:id', isAuthUser, removeToFavorites)

userRoutes.delete('user/delete', isAuthUser, deleteUser)

export default userRoutes;
