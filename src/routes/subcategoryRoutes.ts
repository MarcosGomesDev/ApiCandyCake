import express from "express";
import isUserAuth from "../app/middlewares/authUser";

import createSubcategory from "../app/useCases/subcategory/createSubcategory";
import listSubcategories from "../app/useCases/subcategory/listSubcategories";

const subcategoryRoutes = express.Router();

subcategoryRoutes.get('/subcategories', listSubcategories)

subcategoryRoutes.post('/subcategory/new', isUserAuth, createSubcategory)

export default subcategoryRoutes
