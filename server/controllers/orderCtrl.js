import asyncHandler from "express-async-handler";
import Order from "../model/Order.js";

// @desc Create order
// @route POST /api/orders
// @access Private

export const createOrderCtrl = asyncHandler(async (req, res) => {
    //Find the user

    //Get the payload(customer, orderItems, shippingAddress, totalPrice)

    //Check if orderItems is not empty

    //Create the order - Save it to DB

    //Update the product stock

    //make pamyment (stripe)
});