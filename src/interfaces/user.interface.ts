
export interface User {
    _id: string;
    name: string;
    email: string;
    googleId?: string;
    password?: string;
}

export interface Payload {
    user: User;
}