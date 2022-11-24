import mongoose from "mongoose";
const {Schema} = mongoose;

const TokenForgotPassword = new Schema({
    userId: {
        type: String,
        required: true,
    },
    token: {
        type: Number,
        required: true,
    }
});

export default mongoose.model('TokenForgotPassword', TokenForgotPassword)
