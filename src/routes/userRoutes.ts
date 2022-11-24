import express from "express";

import isUserAuthUser from "../app/middlewares/authUser";
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

const userRoutes = express.Router();

userRoutes.get('/users', isUserAuthUser, listUsers)

userRoutes.get('/favorites', isUserAuthUser, listFavorites)

userRoutes.post('/sign-up/user', createUser)

userRoutes.post('/sign-in/user', loginUser)

userRoutes.post('/forgotpassword/user', forgotPasswordUser)

userRoutes.post('/verifytoken', verifyTokenIsValid)

userRoutes.patch('/update', isUserAuthUser, updateUser)

userRoutes.patch('/resetpassword/:token', changePassword)

userRoutes.patch('/user/upload-profile', isUserAuthUser, upload.single('avatar'), uploadProfile)

userRoutes.delete('/favorites/:id', isUserAuthUser, removeToFavorites)

userRoutes.delete('user/delete', isUserAuthUser, deleteUser)

export default userRoutes;
