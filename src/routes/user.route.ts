import { Application, NextFunction, Request, Response } from "express";
import passport from "passport";
import userController from "../controllers/user.controller";
import { CommonRoutesConfig } from "../helper/CommonRoutesConfig";

export class UserRoute extends CommonRoutesConfig {

    constructor(app: Application) {
        super(app, 'UserRoute');
    }

    configureRoutes(): Application {

        this.app.route('/auth/google')
            .get(passport.authenticate('sign-in-google', { scope: ['profile', 'email']}));
        this.app.route('/auth/google/callback')
            .get(passport.authenticate('sign-in-google', { session: false }),
                userController.createJwt);    

        this.app
            .get('/users');
        this.app
            .post('/users');
        this.app.route('/users/:id')
            .all((req: Request, res: Response, next: NextFunction) => {
                next();
            })
            .get()
            .put()
            .delete()               
        
        return this.app;
    }
}