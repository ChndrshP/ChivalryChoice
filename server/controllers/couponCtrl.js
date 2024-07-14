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
        code:code?.toUpperCase(),
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

//@desc   Get single Coupon
//@route  GET /api/v1/coupons/:id
//@access Private/Admin

export const getSingleCouponCtrl = asyncHandler(async (req, res) => {
    const coupon = await Coupon.findById(req.params.id);
    if(!coupon){
        throw new Error("Coupon not found");
    }
    res.status(200).json({
        status: "success",
        message: "Coupon found",
        coupon,
    });
});

//@desc   Update Coupon
//@route  GET /api/v1/coupons/:id
//@access Private/Admin

export const updateCouponCtrl = asyncHandler(async (req, res) => {
    const coupon = await Coupon.findByIdAndUpdate(req.params.id, {
        code: code?.toUpperCase(),
        discount,
        startDate,
        endDate,
    },{
        new: true,    
    });
    res.json({
        status: "success",
        message: "Coupon updated successfully",
        coupon,
    });
});

//@desc   Delete Coupon
//@route  GET /api/v1/coupons/:id
//@access Private/Admin

export const deleteCouponCtrl = asyncHandler(async (req, res) => {
    const coupon = await Coupon.findByIdAndDelete(req.params.id)
    res.json({
        status: "success",
        message: "Coupon deleted successfully",
        coupon,
    });
});