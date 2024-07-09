import User from '../model/User.js';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs'
import generateToken from '../utils/generateToken.js'
import { getTokenFromHeader } from '../utils/getTokenFromHeader.js';
import { verifyToken } from '../utils/verifyToken.js';
//@desc   Register-User   
//@route  POST /api/v1/users/register
//@access Private/Admin 
export const registerUserCtrl = asyncHandler(async (req, res) => {
    const{fullname,email,password} = req.body;
    //check if user exists
    const userExist = await User.findOne({email});
    if(userExist){
        //throw
        throw new Error("User already exists");
    }
    //hashing Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword =await bcrypt.hash(password, salt);

    //registering user 
    const user = await User.create({
        fullname,
        email,
        password: hashedPassword,
    });
    res.status(201).json({
        status:"success",
        message: "User registered Successfully",
        data: user,
    });  
});

//@desc   Login-User   
//@route  POST /api/v1/users/login
//@access public

export const loginUserCtrl = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    //finding user in DB by email
    const userFound = await User.findOne({
        email,
    });
    if(userFound && await bcrypt.compare(password,userFound?.password)){
        res.json({
            status:'success',
            message:'User logged in successfully',
            userFound,
            token: generateToken(userFound?._id)
        });
    }else{
        throw new Error("Invalid Login Credentials")
    }
});

//@desc   Get user profile
//@route  POST /api/v1/users/login
//@access Private

export const getUserProfileCtrl = asyncHandler(async(req, res) =>{
    const user = await User.findById(req.userAuthId).populate('orders');
    res.json({
        status: "success",
        message:"User Profile fetched successfully",
        user,   
    })
}); 

//@desc   Update user shipping address
//@route  POST /api/v1/users/update/shipping
//@access Private

export const updateShippingAddressctrl = asyncHandler(async(req,res) => {
    const {firstName,lastName,address,city,postalCode,country,phone} = req.body;
    const user = await User.findByIdAndUpdate(req.userAuthId, {
        shippingAddress:{
            firstName,
            lastName,
            address,
            city,
            postalCode,
            country,
            phone
            },
            hasShippingAddress: true,
        },
        {
            new: true,
        }
    );
    res.json({
        status: "success",
        message: "User shipping address updated successfully",
        user,
    });
});