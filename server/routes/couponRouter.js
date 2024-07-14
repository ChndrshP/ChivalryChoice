import express from 'express';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { createCouponCtrl,
        getAllCouponsCtrl,
        getSingleCouponCtrl,
        updateCouponCtrl,
        deleteCouponCtrl
        } from '../controllers/couponCtrl.js';

const couponRouter = express.Router();

couponRouter.post('/', isLoggedIn, createCouponCtrl);
couponRouter.get('/', getAllCouponsCtrl);
couponRouter.get('/:id', getSingleCouponCtrl);
couponRouter.put('/update/:id', isLoggedIn, updateCouponCtrl);
couponRouter.delete('/delete/:id', isLoggedIn, deleteCouponCtrl);

export default couponRouter;
 