import express from 'express';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { createCouponCtrl,
        getAllCouponsCtrl,
        getSingleCouponCtrl,
        updateCouponCtrl,
        deleteCouponCtrl
        } from '../controllers/couponCtrl.js';
import isAdmin from '../middlewares/isAdmin.js';

const couponRouter = express.Router();

couponRouter.post('/', isLoggedIn,isAdmin, createCouponCtrl);
couponRouter.get('/', getAllCouponsCtrl);
couponRouter.get('/:id', getSingleCouponCtrl);
couponRouter.put('/update/:id', isLoggedIn,isAdmin, updateCouponCtrl);
couponRouter.delete('/delete/:id', isLoggedIn,isAdmin, deleteCouponCtrl);

export default couponRouter;
 