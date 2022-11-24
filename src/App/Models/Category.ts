import mongoose from'mongoose';
const {Schema} = mongoose;

const Category = new Schema({
    name: {
        type: String,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: String
})

export default mongoose.model('Category', Category)
