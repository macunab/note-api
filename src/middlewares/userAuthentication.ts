import { Request, Response, NextFunction } from 'express';

class UserAuthentication {

    isAuthenticated(req: Request, res: Response, next: NextFunction) {
        const user = req.user;
        console.log(user);
        if(!user) {
            return res.status(400).json({
                ok: false,
                msg: 'user not authenticated'
            });
        }
        next();
    }
}

export default new UserAuthentication();