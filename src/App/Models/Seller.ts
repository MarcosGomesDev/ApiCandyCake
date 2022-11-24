import mongoose from 'mongoose'
const { Schema } = mongoose
import PointSchema from '../../utils/PointSchema';

const Seller = new Schema({
    name: {
        required: true,
        type: String
    },
    lastname: {
        required: true,
        type: String
    },
    storename: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    avatar: {
        required: true,
        type: String
    },
    seller: {
        required: true,
        type: Boolean
    },
    admin: {
        required: true,
        type: Boolean
    },
    avatarId: {
        type: String
    },
    products: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }]
    },
    location: {
        type: PointSchema,
        index: '2dsphere'
    },
    address: {
        type: [{
            cep: { type: String },
            street: { type: String },
            number: { type: String },
            complement: { type: String },
            neighborhood: { type: String },
            city: { type: String },
            state: { type: String }
        }]
    },
    socialMedias: {
        type: [{
            instagram: {
                type: String
            },
            facebook: {
                type: String
            },
            whatsapp: {
                type: String
            }
        }]
    },
    createdAt: {
        type: String
    },
    updatedAt: {
        type: String
    }
});

export default mongoose.model('Seller', Seller);
