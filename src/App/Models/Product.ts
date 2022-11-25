import mongoose, { Document, Types } from "mongoose";
const {Schema} = mongoose;

interface DocumentResult<T> extends Document {
    _doc: T;
}

interface IRating {
    userName: string,
    userId: string,
    productRating: number,
    productReview: string,
}

interface IProduct extends DocumentResult<IProduct> {
    name: string,
    description: string,
    price: number,
    category: Types.ObjectId,
    subcategory: Types.ObjectId,
    images: Array<string>,
    publicImages: Array<string>,
    seller: any,
    rating: Array<IRating>,
    ratingNumbers: Array<number>,
    ratingSum: number,
    ratingAverage: number,
    createdAt: string,
    updatedAt: string,
}

const Product = new Schema<IProduct>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    subcategory: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Subcategory'
    },
    images: {
        required: true,
        type: [String]
    },
    publicImages: {
        required: true,
        type: [String]
    },
    seller: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Seller'
    },
    rating: {
        type: [{
            userName: {
                type: String,
                default: ''
            },
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            productRating: {
                type: Number,
                default: 0
            },
            productReview: {
                type: String,
                default: ''
            },
            replyRating: {
                type: [{
                    sellerName: { type: String, default: '' },
                    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller' },
                    replyReview: { type: String, default: '' }
                }]
            }
        }]
    },
    ratingNumbers: {
        type: [Number]
    },
    ratingSum: {
        type: Number,
        default: 0
    },
    ratingAverage: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: String
    },
    updatedAt: {
        type: String
    }
})

export default mongoose.model<IProduct>('Product', Product);
