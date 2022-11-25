import mongoose, { Types } from'mongoose';
const {Schema} = mongoose;

interface ISubcat {
    name: string,
    createdBy: Types.ObjectId,
    createdAt: string
}

const Subcategory = new Schema<ISubcat>({
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

export default mongoose.model<ISubcat>('Subcategory', Subcategory)
