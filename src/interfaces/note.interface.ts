import { Types } from "mongoose";


export interface Note {
    title: string;
    content: string;
    createAt: string;
    user: Types.ObjectId;
}