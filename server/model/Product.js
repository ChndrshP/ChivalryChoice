//product Schema
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description:{
            type: String,
            required: true,
        },
        brand: {
            type: String,
            required: true
        },
        category:{
            type: String,
            ref: "Category",
            required: true,
        },
        sizes:{
            type: [String],
            enum: ["S", "M", "L", "XL", "XXL"],
            required: true,
        },
        colors:{
            type: [String],
            required: true,
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"User,"
        },

        images:[
            {
                type: String,
                default: " ",
            },
        ],

        reviews: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Review",
            },
        ],

        price:{
            type: Number,
            required: true,
        },

        totalQty: {
            type: Number,
            required: true,
        },

        totalSOld: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    {
        timestamps: true,
        toJSON: {virtuals: true},
    }
);

//Virtuals
//Total rating

ProductSchema.virtual("totalReviews").get(function(){
    const product = this;
    return product?.reviews?.length;
});

//Average rating

ProductSchema.virtual("averageReviews").get(function(){
    let ratingTotal = 0;
    const product = this;
    product?.reviews?.forEach((review)=>{
        ratingTotal += review?.rating;
    }); 
    return ratingTotal / product?.reviews?.length;
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;