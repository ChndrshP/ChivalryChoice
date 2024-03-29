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

    //search by name
    if(req.query.name){
        productQuery = productQuery.find({
            name: {
                $regex: req.query.name,
                $options: "i",
            },
        });
    }

    //filter by brand 
    if(req.query.brand){
        productQuery = productQuery.find({
            brand: {
                $regex: req.query.brand,
                $options: "i",
            },
        });
    }

    //filter by category 
    if(req.query.category){
        productQuery = productQuery.find({
            category: {
                $regex: req.query.category,
                $options: "i",
            },
        });
    }

    //filter by color 
    if(req.query.color){
        productQuery = productQuery.find({
            color: {
                $regex: req.query.color,
                $options: "i",
            },
        });
    }

    //filter by size 
    if(req.query.size){
        productQuery = productQuery.find({
            size: {
                $regex: req.query.size,
                $options: "i",
            },
        });
    }


    //filter by price
    if(req.query.price){
        const priceRange = req.query.price.split("-");
        //gte: greater than or equal to
        //lte: less than or equal to
        productQuery = productQuery.find({
            price: {$gte: priceRange[0], $lte: priceRange[1]}
        }); 
    }

    //pagination
    //page
    const page = parseInt(req.query.page) ? parseInt(req.query.page) :1;
    //limit
    const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) :1;    
    //startIdx
    const startIndex = (page - 1)*limit;
    //endIdx
    const endIdx = page * limit;
    //Total
    const total = await productQuery;
    
    
    productQuery = productQuery.skip(startIndex).limit(limit);
    //await the query
    const products = await productQuery;

    res.json({
        status: "success",
        products,
    });
});

// @desc Get single products
// @route GET /api/products/: id
// @access Public

export const getSingleProduct = asyncHandler(async ( req, res) =>{
    const product = await Product.findById(req.params.id);
    if(!product){
        throw new Error("Product not found");
    }
    res.json({
        status: "success",
        message: "Product fetched successfully",
        product,
    });
});

// @desc update products
// @route GET /api/products/: id/update
// @access Private/Admin

export const UpdateProductCtrl = asyncHandler(async ( req, res) =>{

    const{
        name,
        description,
        category,
        sizes,
        colors,
        user,
        price,
        totalQty,
        brand,
    } = req.body

    //update
    const product = await Product.findByIdAndUpdate(req.params.id, {
        name,
        description,
        category,
        sizes,
        colors,
        user,
        price,
        totalQty,
        brand,
    },{
        new: true
        }
    );
    res.json({
        status: "success",
        message: "Product updated successfully",
        product,
    });
});

// @desc Delete products
// @route GET /api/products/: id/delete
// @access Private/Admin

export const deleteProductCtrl = asyncHandler(async(req, res) =>{
    await Product.findByIdAndDelete(req.params.id);
    res.json({
        status: "success",
        message: "Product deleted successfully"
    })
});
    