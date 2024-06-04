import mongoose from "mongoose";
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    image: {
        type: String,
        default: "https://res.cloudinary.com/djz3p8sye/image/upload/v1628580134/ecommerce/placeholder.png",
        required: true,
    },
    products:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: "Product",
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;