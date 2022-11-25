import mongoose, { Types } from'mongoose';
const {Schema} = mongoose;

interface ICategory {
    name: string,
    createdBy: Types.ObjectId,
    createdAt: string
}

const Category = new Schema<ICategory>({
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

export default mongoose.model<ICategory>('Category', Category)
