import multer from 'multer';
import {v2 as cloudinary} from 'cloudinary';
import {CloudinaryStorage} from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

//configure cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

//create storage engine for multer

const Mystorage = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['jpg', 'png'],
    params:{
        folder: "Ecommerce-api",
    },
});

//Init multer with storage engine
const categoryupload = multer({
    storage: Mystorage,
});

export default categoryupload;