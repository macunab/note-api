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
    note: {
        type: Schema.Types.ObjectId,
        ref: 'Note'
    }
}, { timestamps: true });

const categoryModel = model<Category & Document>('Category', categorySchema);
export default categoryModel;