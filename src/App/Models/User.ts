import mongoose from "mongoose";
const {Schema} = mongoose;

const User = new Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    avatarId: {
        type: String
    },
    seller: {
        type: Boolean,
        required: true
    },
    admin: {
        type: Boolean,
        required: true
    },
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    createdAt: {
        type: String,
    },
    updatedAt: {
        type: String
    }
})

export default mongoose.model('User', User);
