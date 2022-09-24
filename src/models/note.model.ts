import { Document, model, Schema } from "mongoose";
import { Note } from "../interfaces/note.interface";


const noteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }
}, { timestamps: true });

const noteModel = model<Note & Document>('Note', noteSchema);
export default noteModel;