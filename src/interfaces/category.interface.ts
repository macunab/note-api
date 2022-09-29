import { Types } from "mongoose";

export interface Category {
    name: string;
    color: string;
    user: Types.ObjectId;
}