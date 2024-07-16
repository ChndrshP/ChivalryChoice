import express  from "express";
import { createCategoryCtrl,
         getAllCategoriesCtrl,
         getSingleCategoryCtrl,
         updateCategoryCtrl,
         deleteCategoryCtrl } from "../controllers/categoriesCtrl.js";
import {isLoggedIn} from '../middlewares/isLoggedIn.js';
import categoryupload from "../config/categoryUpload.js";

const categoriesRouter = express.Router();

categoriesRouter.post(("/"), isLoggedIn, categoryupload.single('file'), createCategoryCtrl);
categoriesRouter.get(("/"), getAllCategoriesCtrl);
categoriesRouter.get(("/:id"), getSingleCategoryCtrl);
categoriesRouter.delete(("/:id"), deleteCategoryCtrl);
categoriesRouter.put(("/:id"),updateCategoryCtrl);

export default categoriesRouter; 