import express from "express";
import isUserAuth from "../app/middlewares/authUser";

import createCategory from "../app/useCases/category/createCategory";
import listCategories from "../app/useCases/category/listCategories";

const categoryRoutes = express.Router();

categoryRoutes.get('/categories', listCategories)

categoryRoutes.post('/category/new', isUserAuth, createCategory)

export default categoryRoutes
