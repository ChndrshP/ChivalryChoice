import asyncHandler from "express-async-handler";
import Coupon from "../model/Coupon.js";

//@desc   Create new Coupon
//@route  POST /api/v1/coupons
//@access Private/Admin

export const createCouponCtrl = asyncHandler(async (req, res) => {
    const {code, startDate, endDate, discount} = req.body;
    //Checking if coupon already exists
    const couponExists = await Coupon.findOne({
        code,
    })
    if(couponExists){
        throw new Error("Coupon already exists")
    }
    //Checking if discount is a number
    if(isNaN(discount)){
        throw new Error("Discount must be a number")
    }
    //createing new coupon
    const coupon = await Coupon.create({
        code,
        discount,
        startDate,
        endDate,
        user: req.userAuthId,
    });
    //send response
    res.status(201).json({
        status: "success",
        message: "Coupon created successfully",
        coupon,
    });
});

//@desc   Get all Coupon
//@route  GET /api/v1/coupons
//@access Private/Admin

export const getAllCouponsCtrl = asyncHandler(async (req, res) => {
    const coupons = await Coupon.find(); 
    res.status(200).json({
        status: "success",
        message: "All coupons",
        coupons,
    });
});