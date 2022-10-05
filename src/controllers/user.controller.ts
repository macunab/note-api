import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import userModel from "../models/user.model";
import bcrypt from 'bcryptjs';
import { User } from "../interfaces/user.interface";
import jwtHelper from "../helper/jwtHelper";

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

    /*
        1) comprobar si el email no esta registrado.
        2) encriptar el password.
        3) guardar el usuario en la db.
        4) generar el token.
        5) retornar el token.
    */
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
            const token = jwtHelper.jwtSign(user);
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
