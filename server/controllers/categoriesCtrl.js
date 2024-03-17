import asyncHandler from "express-async-handler";
import Category from "../model/Category.js";

//@desc Create new category
//@route POST /api/categories
//@access Private/Admin

export const createCategoryCtrl = asyncHandler(async(req, res)=>{
    const {name} = req.body;
    //Category Exists
    const categoryExists = await Category.findOne({name});
    if(categoryExists){
        throw new Error("Category Already Exists");
    }
    //create
    const category = await Category.create({
        name,
        user: req.userAuthId,
    }); 

    res.json({
        status: "success",
        message: "Category created successfully",
        category,
    });
});


//@desc Create new category
//@route POST /api/categories
//@access Public

export const getAllCategoriesCtrl = asyncHandler(async(req, res)=>{
    const categories = await Category.find(); 

    res.json({
        status: "success",
        message: "Categories fetched successfully",
        category,
    });
});
 

//@desc Create new category
//@route POST /api/categories
//@access Public

export const getSingleCategoryCtrl = asyncHandler(async(req, res)=>{
    const category = await Category.find(req.params); 

    res.json({
        status: "success",
        message: "Category fetched successfully",
        category,
    });
});
