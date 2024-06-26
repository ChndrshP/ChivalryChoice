import asyncHandler from "express-async-handler";
import Order from "../model/Order.js";

// @desc Create order
// @route POST /api/orders
// @access Private

export const createOrderCtrl = asyncHandler(async (req, res) => {
    res.json({
        msg: "Create order route",
    });
});