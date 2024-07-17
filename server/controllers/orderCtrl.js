import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe"; 
import Order from "../model/Order.js";
import User from "../model/User.js";
import Product from "../model/Product.js";
import Coupon from "../model/Coupon.js";

// @desc Create order
// @route POST /api/orders
// @access Private

//stripe instance
const stripe = new Stripe(process.env.STRIPE_KEY);

export const createOrderCtrl = asyncHandler(async (req, res) => {
    //Get the coupon details
    const {coupon} = req.query;

    const couponFound = await Coupon.findOne({
        code: coupon?.toUpperCase(),
    });
    if(couponFound?.isExpired){
        throw new Error("Coupon is expired");
    }
    if(!couponFound){
        throw new Error("Invalid coupon");
    }

    //get discount
    const discount = couponFound?.discount / 100;

    
    //Get the payload(customer, orderItems, shippingAddress, totalPrice)
    const {orderItems, shippingAddress, totalPrice} = req.body;

    //Find the user
    const user = await User.findById(req.userAuthId);

    //Check if user has shipping address
    if(!user?.hasShippingAddress){
        throw new Error("Provide a shipping address...");
    }
    //Check if orderItems is not empty
    if(orderItems?.length <= 0){
        throw new Error("No order items");
    }

    //Create the order - Save it to DB
    const order = await Order.create({
        user: user?._id,
        orderItems,
        shippingAddress,
        totalPrice: couponFound ? totalPrice - (totalPrice * discount) : totalPrice,
    });

    //Update the product qty
    const products = await Product.find({_id: {$in: orderItems}});

    orderItems?.map(async(order) => {
        const product = products?.find((product) => {
            return product?._id.toString() === order?._id.toString();
        });
        if(product){
            product.totalSold += order.qty;
        }
        await product?.save();
    });
    //push order into user
    user?.orders.push(order?._id);
    await user?.save();

    //make pamyment (stripe)
    const convertedOrders = orderItems?.map((item) => {
        return {
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item?.name,
                    description: item?.description,
                },
                unit_amount: item?.price * 100,
            },
            quantity: item?.qty,
        };
    });
    const session = await stripe.checkout.sessions.create({
        line_items: convertedOrders,
        metadata: {
            order_id: JSON.stringify(order?._id),
        },
        mode:"payment",
        success_url:'http://localhost:3000/success',
        cancel_url:'http://localhost:3000/cancel'
    });
    res.send({url: session.url});
});

// @desc get all orders
// @route GET /api/v1/orders
// @access Private

export const getAllorderCtrl = asyncHandler(async(req,res) => {
    //find all orders
    const orders = await Order.find();
    res.json({
        success: true,
        message: "All orders",
        orders,
    });
});

// @desc get single orders
// @route GET /api/v1/orders
// @access Private

export const getSingleorderCtrl = asyncHandler(async(req,res) => {
    //get th id from params
    const id = req.params.id;
    const order = await Order.findById(id);
    res.json({
        success: true,
        message: "Single orders",
        order,
    });
});

// @desc update order to delivered
// @route GET /api/v1/orders/update/:id
// @access Private/admin

export const updateOrderCtrl = asyncHandler(async(req,res) => {
    const id = req.params.id;

    const updateOrder = await Order.findByIdAndUpdate(id,{
        status: req.body.status,
    },{
        new: true,
    });
    res.status(200).json({
        success: true,
        message: "Order Update",
        updateOrder,
    });
});

// @desc get sale sum of orders
// @route GET /api/v1/orders/sales/sum
// @access Private/admin

export const getSalesSumCtrl = asyncHandler(async(req,res) => {
    //get the sales
    const sales = await Order.aggregate([
        {
            $group:{
                _id: null,
                totalSales: {$sum: "$totalPrice"},
            }
        }
    ]);
    res.status(200).json({
        success: true,
        message: "Sum of Orders",
        sales,
    });
});