import mongoose from "mongoose";
const Schema = mongoose.Schema;
//Generate random order number
const randomTxt = Math.random().toString(36).substring(7).toLocaleLowerCase();
const randomNumbers = Math.floor(1000 + Math.random() * 9000);
const OrderSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    orderItems:[
        {
            type: Object,
            required: true,
        },
    ],
    shippingAddress:{
        type: Object,
        required: true,
    },
    orderNumber:{
        type: String,
        required: true,
        default : randomTxt + randomNumbers,
    },
    //For Stripe Payment
    paymentStatus:{
        type: String,
        required: true,
        default: "Not paid",
    },
    paymentMethod:{
        type: String,
        required: true,
        default: "Not specified",
    },
    currency:{
        type: String,
        default: "Not Specified",
    },
    //For Admin
    status:{
        type: String,
        default: "pending",
        enum: ["pending", "processing", "shipped", "delivered"],
    },
    deliveredAt:{
        type: Date,
        },
    },
    {
        timestamps: true,
    }
); 

const Order = mongoose.model('Order', OrderSchema);

export default Order;