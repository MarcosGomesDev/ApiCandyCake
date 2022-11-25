import mongoose from "mongoose";
const {Schema} = mongoose;

interface IToken {
    id: string,
    token: number
}

const TokenForgotPassword = new Schema<IToken>({
    id: {
        type: String,
        required: true,
    },
    token: {
        type: Number,
        required: true,
    }
});

export default mongoose.model<IToken>('TokenForgotPassword', TokenForgotPassword)
