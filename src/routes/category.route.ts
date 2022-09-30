import { Application, NextFunction } from "express";
import { check } from "express-validator";
import passport from "passport";
import categoryController from "../controllers/category.controller";
import { CommonRoutesConfig } from "../helper/CommonRoutesConfig";
import validationFields from "../middlewares/validationFields";

export class CategoryRoute extends CommonRoutesConfig {
    constructor(app: Application) {
        super(app, 'CategoryRoutes');
    }

    configureRoutes(): Application {
        this.app.route('/categories')
            .get( passport.authenticate('jwt', { session: false }),
                categoryController.findCategoriesByUser);

        this.app.route('/categories')
            .post( 
                check('name', 'the name is required').not().isEmpty(),
                check('color', 'the color is required').not().isEmpty(),
                validationFields.verifyFieldsErrors,
                categoryController.createCategory);

        this.app.route('/categories/:id')
            .all((next: NextFunction) => {
                next();
            })
            .get()
            .put()
            .delete();
        
        return this.app;
    }
}