import { Request, Response } from "express";
import userModel from "../models/user.model";
import bcrypt from 'bcryptjs';
import jwtHelper from "../helper/jwtHelper";

class UserController {

    async createJwt(req: Request, res: Response) {
        const user = req.user;
        console.log(user);
        if(user) {
            try {
                const token = await jwtHelper.jwtSign(user);
                res.status(200).json({
                    ok: true,
                    token,
                    msg: 'Token create successfully'
                })
            } catch(err) {
                res.status(400).json({
                    ok: false,
                    msg: `An error ocurred while trying generated a jwt, error: ${ err }`
                })
            }

            
        }
    }

    async authenticationWhitCredentials(req: Request, res: Response) {
        const { email, password }= req.body;
        try {
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
        const token = await jwtHelper.jwtSign(user);
        res.status(200).json({
            ok: true,
            token,
            msg: 'User authenticated successfully'
        })
        } catch(err) {
            res.status(400).json({
                ok: false,
                msg: `An error ocurred while trying login, error: ${ err }`
            })
        }
    }

    async registerUserWithCredentials(req: Request, res: Response) {
        const { email, password } = req.body;
        try {
            const userDb = await userModel.findOne({ email });
            if(userDb) {
                return res.status(400).json({
                    ok: false,
                    msg: 'the email already exists'
                })
            }
            const user = new userModel(req.body);
            const salt = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync(password, salt);
            const token = await jwtHelper.jwtSign(user);
            await user.save();
            res.status(200).json({
                ok: true,
                token,
                msg: 'User register successfully'
            })
        } catch(err) {
            res.status(400).json({
                ok: false,
                msg: `An error ocurred while trying to register a user, error: ${ err }`
            })
        }
    }
}

export default new UserController();
