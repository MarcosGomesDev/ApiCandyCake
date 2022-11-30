import mongoose, { Types } from 'mongoose'
const { Schema } = mongoose
import PointSchema from '../../utils/PointSchema';

interface ISocial {
    instagram: string,
    facebook: string,
    whatsapp: string
}

interface ISeller {
    name: string,
    lastname: string,
    storename: string,
    email: string,
    credential: string,
    password: string,
    avatar: string,
    avatarId: string,
    seller: boolean,
    admin: boolean,
    products: Array<Types.ObjectId>,
    location: any,
    address: Array<string>,
    socialMedias: Array<ISocial>,
    createdAt: string,
    updatedAt: string,
}

const Seller = new Schema<ISeller>({
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
    credential: {
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
        type: String
    },
    avatarId: {
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
    socialMedias:[{
        instagram: {
            type: String
        },
        facebook: {
            type: String
        },
        whatsapp: {
            type: String
        }
    }],
    createdAt: {
        type: String
    },
    updatedAt: {
        type: String
    }
});

export default mongoose.model<ISeller>('Seller', Seller);
