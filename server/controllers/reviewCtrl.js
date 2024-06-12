import asyncHandler from "express-async-handler";
import Review from "../model/Review.js";
import Product from "../model/Product.js";

// @desc Create new review
// @route POST /api/reviews
// @access Private/Admin

export const createReviewCtrl = asyncHandler(async(req, res) =>{
    const {product, message, rating} = req.body;
    //Find the product
    const {productID} = req.params;
    const productFound = await Product.findById(productID);
    if(!productFound){
        throw new Error("Product not Found");
    }
    //If user already reviewed this product

    //create review
    const review = await Review.create({
        message,
        rating, 
        product: productFound?._id,
        user: req.userAuthId,
    });

    //Push Review into Product found
    productFound.reviews.push(review?._id)
    //resave
    await productFound.save();
    res.status(201).json({
        success: true,
        message: "Review created successfully",
    });
}) 
