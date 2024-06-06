import express  from "express";
import { createBrandCtrl,
         getAllBrandsCtrl,
         getSinglebrandCtrl,
         updatebrandCtrl,
         deletebrandCtrl } from "../controllers/brandCtrl.js";
import {isLoggedIn} from '../middlewares/isLoggedIn.js';

const brandsRouter = express.Router();

brandsRouter.post(("/"), isLoggedIn, createBrandCtrl);
brandsRouter.get(("/"), getAllBrandsCtrl);
brandsRouter.get(("/:id"), getSinglebrandCtrl);
brandsRouter.delete(("/:id"), deletebrandCtrl);
brandsRouter.put(("/:id"),updatebrandCtrl);

export default brandsRouter; 