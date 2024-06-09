import asyncHandler from "express-async-handler";
import Color from "../model/Color.js";

//@desc Create new color
//@route POST /api/color
//@access Private/Admin

export const createColorCtrl = asyncHandler(async(req, res)=>{
    const {name} = req.body;
    //brand Exists
    const colorFound = await Color.findOne({name});
    if(colorFound){
        throw new Error("Brand Already Exists");
    }
    //create
    const color = await Color.create({
        name: name.toLowerCase(),
        user: req.userAuthId,
    }); 

    res.json({
        status: "success",
        message: "Color created successfully",
        color,
    });
});


//@desc Fetch all color
//@route POST /api/color
//@access Public

export const getAllColorsCtrl = asyncHandler(async(req, res)=>{
    const Colors = await Color.find(); 

    res.json({
        status: "success",
        message: "Colors fetched successfully",
        Colors,
    });
});
 

//@desc Fetch Single color
//@route POST /api/color
//@access Public

export const getSinglecolorCtrl = asyncHandler(async(req, res)=>{
    const color = await Color.findById(req.params.id); 

    res.json({
        status: "success",
        message: "Color fetched successfully",
        color,
    });
});


//@desc Update color
//@route PUT /api/color/:id
//@access Private/Admin

export const updateColorCtrl = asyncHandler(async(req, res) => {
    const {name} = req.body;

    const color = await Color.findByIdAndUpdate(
        req.params.id, 
        {
        name,
        },
        {
        new: true
        }
    );
    res.json({
        status: "success",
        message: "Color updated successfully",
        color,
    });
});


//@desc Delete color
//@route PUT /api/color/:id
//@access Private/Admin

export const deleteColorCtrl = asyncHandler(async(req, res) =>{
    await Color.findByIdAndDelete(req.params.id);
    res.json({
        status: "success",
        message: "Color deleted successfully"
    })
});
    