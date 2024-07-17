import express  from "express";
import { createColorCtrl,
         getAllColorsCtrl,
         getSinglecolorCtrl,
         updateColorCtrl,
         deleteColorCtrl } from "../controllers/colorCtrl.js";
import {isLoggedIn} from '../middlewares/isLoggedIn.js';
import isAdmin from "../middlewares/isAdmin.js";

const colorsRouter = express.Router();

colorsRouter.post(("/"), isLoggedIn, isAdmin,createColorCtrl);
colorsRouter.get(("/"), getAllColorsCtrl);
colorsRouter.get(("/:id"), getSinglecolorCtrl);
colorsRouter.delete(("/:id"), isAdmin,deleteColorCtrl);
colorsRouter.put(("/:id"),isLoggedIn, isAdmin,updateColorCtrl);

export default colorsRouter; 