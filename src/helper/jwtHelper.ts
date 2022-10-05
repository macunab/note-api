import { User } from "../interfaces/user.interface";
import jwt from 'jsonwebtoken';

class JwtHelper {

    jwtSign(user: User) {
        const payload = { user };
        const JWT_SECRET_KEY = process.env.JWT_SECRET as string;
        return new Promise(( resolve, reject ) => {
            jwt.sign(payload, JWT_SECRET_KEY,
                { expiresIn: '1h'},
                (err, token) =>{
                    (err) ? reject(err) : resolve(token);
                })
        })
    }
}

export default new JwtHelper();