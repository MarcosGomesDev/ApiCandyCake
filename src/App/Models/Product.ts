import mongoose from "mongoose";
const {Schema} = mongoose;

const Product = new Schema({
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    subcategory: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sub_category'
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
        type: mongoose.Schema.Types.ObjectId,
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

export default mongoose.model('Product', Product);
