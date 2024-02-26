import asyncHandler from "express-async-handler";
import Product from "../model/Product.js";

// @desc Create new product
// @route POST /api/products
// @access Private/Admin

export const createProductCtrl = asyncHandler(async(req, res)=>{
    const {name, description, category, sizes, colors, user, price, totalQty} = req.body;
    //Product Exists
    const productExists = await Product.findOne({name});
    if(productExists){
        throw new Error("Product Already Exists");
    }
    //Create the product
    const product = await Product.create({
        name,
        description,
        category,
        sizes,
        colors,
        user: req.userAuthID,
        price,
        totalQty,
    });
    //push the product into the category

    res.json({
        status: "success",
        message: "Product created successfully",
        product,
    });
});
