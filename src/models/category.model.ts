import { Document, model, Schema } from "mongoose";
import { Category } from "../interfaces/category.interface";

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    toJSON: {
        virtuals: true
    },
    timestamps: true
 });

 categorySchema.virtual('notes', {
    ref: 'Note',
    localField:'_id',
    foreignField: 'category'
 });

const categoryModel = model<Category & Document>('Category', categorySchema);
export default categoryModel;