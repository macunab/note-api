import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import userModel from "../models/user.model";
import bcrypt from 'bcryptjs';
import { User } from "../interfaces/user.interface";

class UserController {

    createJwt(req: Request, res: Response) {
        const JWT_SECRET_KEY = process.env.JWT_SECRET as string;
        const user = req.user;
        console.log(user);
        if(user) {
            const token = jwt.sign({ user },
                JWT_SECRET_KEY,
                { expiresIn: '1h'},
                (err, token) => {
                    if(err) {
                        return res.status(400).json({
                            ok: false,
                            msg: err.message
                        });
                    }
                    return res.status(200).json({
                        ok: true,
                        token
                    })
                })
        }
    }

    async authenticationWhitCredentials(req: Request, res: Response) {
        const { email, password }= req.body;
        const JWT_SECRET_KEY = process.env.JWT_SECRET as string;
        const user = await userModel.findOne({ email: email });
        if(!user) {
            return res.status(400).json({
                ok: false,
                msg: 'The credentials do not correspond to an existing user'
            });
        }
        const isPasswordValid = bcrypt.compareSync(password, user.password!);
        if(!isPasswordValid) {
            return res.status(400).json({
                ok: false,
                msg: 'The credentials do not correspond to an existing user'
            });
        }
        const token = jwt.sign({ user }, 
            JWT_SECRET_KEY,
            { expiresIn: '1h'},
            (err, token) => {
                if(err) {
                    return res.status(400).json({
                        ok: false,
                        msg: err.message
                    });
                }
                return res.status(200).json({
                    ok: true,
                    token
                })
            })
    }

    async registerUserWithCredentials(req: Request, res: Response) {
        const user: User = req.body;
        try {

        } catch(err) {
            
        }
    }
}

export default new UserController();
