import asyncHandler from "express-async-handler";
import Product from "../model/Product.js";

// @desc Create new product
// @route POST /api/products
// @access Private/Admin

export const createProductCtrl = asyncHandler(async(req, res)=>{
    const {name, description, category, sizes, colors, user, price, totalQty, brand} = req.body;
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
        user: req.userAuthId,
        price,
        totalQty,
        brand,
    });
    //push the product into the category

    res.json({
        status: "success",
        message: "Product created successfully",
        product,
    });
});


// @desc Get all products
// @route GET /api/products
//@access Public

export const getProductCtrl = asyncHandler(async(req, res) =>{
    //query
    let productQuery = Product.find();

    //search by namee
    if(req.query.name){
        productQuery = productQuery.find({
            name: {
                $regex: req.query.name,
                $options: "i",
            },
        });
    }

    //await the query
    const products = productQuery;

    res.json({
        status: "success",
        products,
    });
});