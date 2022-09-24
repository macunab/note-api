import { Types } from "mongoose";

export interface Category {
    name: string;
    color: string;
    note: Types.ObjectId;
}