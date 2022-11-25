import mongoose from "mongoose";
const {Schema} = mongoose;

interface UserProps {
    name: string,
    lastname: string,
    email: string,
    password: string,
    avatar: string,
    avatarId: string,
    seller: boolean,
    admin: boolean,
    favorites: Array<string>,
    createdAt: string,
    updatedAt: string,
}

const User = new Schema<UserProps>({
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
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    createdAt: {
        type: String,
    },
    updatedAt: {
        type: String
    }
})

export default mongoose.model<UserProps>('User', User);
