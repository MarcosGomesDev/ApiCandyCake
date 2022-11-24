import mongoose from'mongoose';
const {Schema} = mongoose;

const Subcategory = new Schema({
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

export default mongoose.model('Subcategory', Subcategory)
