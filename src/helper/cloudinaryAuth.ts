import cloudinary from 'cloudinary';
import * as dotenv from 'dotenv';
dotenv.config()

const cloud = cloudinary.v2

cloud.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
})

export default cloud;
