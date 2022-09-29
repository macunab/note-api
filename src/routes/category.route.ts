import { Application, Request, Response, NextFunction } from "express";
import { CommonRoutesConfig } from "../helper/CommonRoutesConfig";

export class CategoryRoute extends CommonRoutesConfig {
    constructor(app: Application) {
        super(app, 'CategoryRoutes');
    }

    configureRoutes(): Application {
        this.app.route('/categorys')
            .get();
        this.app.route('/categorys')
            .post();
        this.app.route('/categorys/:id')
            .all((next: NextFunction) => {
                next();
            })
            .get()
            .put()
            .delete();
        
        return this.app;
    }
}