import { Request, Response } from "express";
import userModel from "../models/user.model";
import bcrypt from 'bcryptjs';
import jwtHelper from "../helper/jwtHelper";
import jwt from 'jsonwebtoken';
import { Payload, User } from "../interfaces/user.interface";

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
            data: user,
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

    async updatePassword(req: Request, res: Response) {
        const user: User = req.user?.user;
        const { password } = req.body;
        const salt = bcrypt.genSaltSync();
        
        try {
            const passwordEncrypt = bcrypt.hashSync(password, salt);
            await userModel.findByIdAndUpdate(user._id, { password: passwordEncrypt });
            res.status(200).json({
                ok: true,
                msg: 'The user was updated successfully'
            });
        } catch(err) {
            res.status(400).json({
                ok: false,
                msg: 'An error ocurred while trying update a password'
            })
        } 
    }

    async verifyEmail(req: Request, res: Response) {
        const { email } = req.body;
        try {
            const userDb = await userModel.findOne({ email: email});
            if(userDb) {
                return res.status(200).json({
                    ok: false,
                    msg: 'the email already exist'
                });
            }
            res.status(200).json({
                ok: true,
                msg: 'the email not exist in the db'
            });
        } catch(err) {
            res.status(400).json({
                ok: false,
                msg: `An error ocurred while trying verify a email, error: ${err}`
            })
        }
    }

    async verifyToken(req: Request, res: Response) {
        const headerToken = req.header('x-token');
        if( !headerToken ) {
            return res.status(401).json({
                ok: false,
                msg: 'invalid token'
            })
        }
        try {
            const { user } = jwt.verify(headerToken, (process.env.JWT_SECRET as string)) as Payload;
            console.log(user);
            const token = await jwtHelper.jwtSign(user);
            res.status(200).json({
                ok: true,
                token,
                data: user,
                msg: 'the token is valid and was refreshed'
            })
        } catch(err) {
            res.status(401).json({
                ok: false,
                msg: 'the token expired'
            })
        }
       
    }

    async verifyPassword(req: Request, res: Response) {
        const { password } = req.body;
        const user: User = req.user?.user;
        try {
            const dbUser = await userModel.findOne({email: user.email});
            const isPasswordValid = bcrypt.compareSync(password, dbUser?.password!);
            console.log(`ES VALIDO EL PASSWORD: ${isPasswordValid}` )
            console.log(`EL PASSWORD ES: ${ dbUser?.password! }`);
            if(!isPasswordValid){
                return res.status(200).json({
                    ok: false,
                    msg: 'The password does not match'
                }); 
            }
            res.status(200).json({
                ok: true,
                msg: 'The password match'
            });
        } catch(err) {
            res.status(400).json({
                ok: false,
                msg: `An error ocurred while trying verify password, error: ${ err}`
            });
        }
    }
}

export default new UserController();
