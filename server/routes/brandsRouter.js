import express  from "express";
import { createBrandCtrl,
         getAllBrandsCtrl,
         getSinglebrandCtrl,
         updatebrandCtrl,
         deletebrandCtrl } from "../controllers/brandCtrl.js";
import {isLoggedIn} from '../middlewares/isLoggedIn.js';
import isAdmin from "../middlewares/isAdmin.js";

const brandsRouter = express.Router();

brandsRouter.post(("/"), isLoggedIn, isAdmin,createBrandCtrl);
brandsRouter.get(("/"), getAllBrandsCtrl);
brandsRouter.get(("/:id"), getSinglebrandCtrl);
brandsRouter.delete(("/:id"),isLoggedIn,isAdmin, deletebrandCtrl);
brandsRouter.put(("/:id"),isLoggedIn,isAdmin,updatebrandCtrl);

export default brandsRouter; 