import cloudinary from 'cloudinary';
import endpoints from '../../endpoints.config';

const cloud = cloudinary.v2

cloud.config({
    cloud_name: endpoints.CLOUDNAME,
    api_key: endpoints.API_KEY,
    api_secret: endpoints.API_SECRET,
})

export default cloud;
