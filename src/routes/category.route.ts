import { Application, NextFunction, Request, Response } from "express";
import { check } from "express-validator";
import passport from "passport";
import categoryController from "../controllers/category.controller";
import { CommonRoutesConfig } from "../helper/CommonRoutesConfig";
import validationFields from "../middlewares/validationFields";
import categoryModel from '../models/category.model';

export class CategoryRoute extends CommonRoutesConfig {
    constructor(app: Application) {
        super(app, 'CategoryRoutes');
    }

    configureRoutes(): Application {
        this.app.route('/categories')
            .get( 
                passport.authenticate('jwt', { session: false }),
                categoryController.findCategoriesByUser);

        this.app.route('/categories')
            .post(
                passport.authenticate('jwt', { session: false }),
                check('name', 'the name is required').not().isEmpty()
                    .custom(value => {
                        console.log(`RUTA CREATE: ${value}`)
                        return categoryModel.findOne({name: value})
                            .then(res => {
                                if(!res){
                                    return Promise.resolve('Ok');
                                } else {
                                    return Promise.reject('Name already taken');
                                }
                            })
                    }),
                check('color', 'the color is required').not().isEmpty(),
                validationFields.verifyFieldsErrors,
                categoryController.createCategory);

        this.app.route('/categories/verify-name')
            .post(
                passport.authenticate('jwt', { session: false }),
                check('name', 'the name is required').not().isEmpty(),
                validationFields.verifyFieldsErrors,
                categoryController.verifyName
            );        

        this.app.route('/categories/:id')
            .all((req: Request, res: Response, next: NextFunction) => {
                next();
            })
            .get()
            .put(
                passport.authenticate('jwt', { session: false }),
                check('name', 'the name is required').not().isEmpty(),
                check('color', 'the color ir required').not().isEmpty(),
                validationFields.verifyFieldsErrors,
                categoryController.updateCategory
            )
            .delete(
                passport.authenticate('jwt', { session: false }),
                categoryController.deleteCategory
            );
        
        return this.app;
    }
}