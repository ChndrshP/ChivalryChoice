import express from 'express';
import { createCouponCtrl

        } from '../controllers/couponCtrl.js';

const couponRouter = express.Router();

couponRouter.post('/', createCouponCtrl);

export default couponRouter;
