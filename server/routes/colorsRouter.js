import express  from "express";
import { createColorCtrl,
         getAllColorsCtrl,
         getSinglecolorCtrl,
         updateColorCtrl,
         deleteColorCtrl } from "../controllers/colorCtrl.js";
import {isLoggedIn} from '../middlewares/isLoggedIn.js';

const colorsRouter = express.Router();

colorsRouter.post(("/"), isLoggedIn, createColorCtrl);
colorsRouter.get(("/"), getAllColorsCtrl);
colorsRouter.get(("/:id"), getSinglecolorCtrl);
colorsRouter.delete(("/:id"), deleteColorCtrl);
colorsRouter.put(("/:id"),updateColorCtrl);

export default colorsRouter; 