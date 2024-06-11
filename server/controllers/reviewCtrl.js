import asyncHandler from "express-async-handler";
import Review from "../model/Review.js";
import Product from "../model/Product.js";

// @desc Create new review
// @route POST /api/reviews
// @access Private/Admin

export const createReviewCtrl = asyncHandler(async(req, res) =>{
    //Find the product
    const {product, message, rating} = req.body;
    const productFound = await Product.findById(productID);
    if(!productFound){
        throw new Error("Product not Found");
    }
    //If user already reviewed this product
}) 