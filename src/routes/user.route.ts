import { Application, NextFunction, Request, Response } from "express";
import { check } from "express-validator";
import passport from "passport";
import userController from "../controllers/user.controller";
import { CommonRoutesConfig } from "../helper/CommonRoutesConfig";

export class UserRoute extends CommonRoutesConfig {

    constructor(app: Application) {
        super(app, 'UserRoute');
    }

    configureRoutes(): Application {

        this.app.route('/auth/google')
            .get(passport.authenticate('sign-in-google', { scope: ['profile', 'email'] }));
        this.app.route('/auth/google/callback')
            .get(passport.authenticate('sign-in-google', { session: false }),
                userController.createJwt);

        this.app.route('/auth/login')
            .post(
                check('email', 'Must be a valid email').isEmail(),
                check('password', 'The password is required').not().isEmpty(),
                userController.authenticationWhitCredentials
            );

        this.app.route('/auth/email-verify')
            .post(
                check('email', 'the email is required').not().isEmpty(),
                userController.verifyEmail
            );

        this.app.route('/auth/password-verify')
            .post(
                passport.authenticate('jwt', { session: false }),
                check('password', 'The password is required').not().isEmpty(),
                userController.verifyPassword
            )        

        this.app.route('/auth/verify')
                .get(userController.verifyToken);

        this.app
            .post('/users',
                check('name', 'The name is required').not().isEmpty(),
                check('email', 'Must be a valid email').isEmail(),
                check('password', 'The password is required').not().isEmpty(),
                userController.registerUserWithCredentials);
        this.app.route('/users/:id')
            .all((req: Request, res: Response, next: NextFunction) => {
                next();
            })
            .get()
            .put(
                passport.authenticate('jwt', {session: false}),
                check('password', 'The password is required').not().isEmpty(),
                userController.updatePassword)
            .delete()

        return this.app;
    }
}