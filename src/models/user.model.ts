import { Document, model, Schema } from "mongoose";
import { User } from "../interfaces/user.interface";


const userSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    googleId: {
        type: String
    },
    password: {
        type: String
    }
});

const userModel = model<User & Document>('User', userSchema);
export default userModel;