import asyncHandler from "express-async-handler";
import Brand from "../model/Brand.js";

//@desc Create new brand
//@route POST /api/brands
//@access Private/Admin

export const createBrandCtrl = asyncHandler(async(req, res)=>{
    const {name} = req.body;
    //brand Exists
    const brandFound = await Brand.findOne({name});
    if(brandFound){
        throw new Error("Brand Already Exists");
    }
    //create
    const brand = await Brand.create({
        name: name.toLowerCase(),
        user: req.userAuthId,
    }); 

    res.json({
        status: "success",
        message: "Brand created successfully",
        brand,
    });
});


//@desc Fetch all brands
//@route POST /api/brands
//@access Public

export const getAllBrandsCtrl = asyncHandler(async(req, res)=>{
    const brands = await Brand.find(); 

    res.json({
        status: "success",
        message: "Brands fetched successfully",
        brands,
    });
});
 

//@desc Fetch Single Brand
//@route POST /api/brands
//@access Public

export const getSinglebrandCtrl = asyncHandler(async(req, res)=>{
    const brand = await Brand.findById(req.params.id); 

    res.json({
        status: "success",
        message: "Brand fetched successfully",
        brand,
    });
});


//@desc Update brand
//@route PUT /api/brands/:id
//@access Private/Admin

export const updatebrandCtrl = asyncHandler(async(req, res) => {
    const {name} = req.body;

    const brand = await Brand.findByIdAndUpdate(
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
        message: "Brand updated successfully",
        brand,
    });
});


//@desc Delete brand
//@route PUT /api/brands/:id
//@access Private/Admin

export const deletebrandCtrl = asyncHandler(async(req, res) =>{
    await Brand.findByIdAndDelete(req.params.id);
    res.json({
        status: "success",
        message: "Brand deleted successfully"
    })
});
    