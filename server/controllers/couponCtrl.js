import asyncHandler from "express-async-handler";
//import Coupon from "../models/Coupon.js";

//@desc   Create new Coupon
//@route  POST /api/v1/coupons
//@access Private/Admin

export const createCouponCtrl = asyncHandler(async (req, res) => {
    res.json({
        msg:"Coupon CTRL",
    });
});

