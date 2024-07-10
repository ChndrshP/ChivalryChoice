import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CouponSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    startDate:{
        type: Date,
        required: true,
    },
    expireAt: {
        type: Date,
        required: true,
    },    discount: {
        type: Number,
        required: true,
    },
    discount:{
        type: Number,
        required: true,
        default: 0,
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
},
    {
        timestamps: true,
    }
);