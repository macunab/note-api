import { Application, NextFunction, Request, Response } from 'express';
import { CommonRoutesConfig } from "../helper/CommonRoutesConfig";


export class NoteRoute extends CommonRoutesConfig {
    constructor(app: Application) {
        super(app, 'NoteRoutes');
    }

    configureRoutes(): Application {
        
        this.app.route('/notes')
            .get();
        this.app.route('/notes')
            .post();
        this.app.route('/notes/:id')
            .all((req: Request, res: Response, next: NextFunction) => {
                next();
            })
            .get()
            .put()
            .delete();       
        return this.app;
    }
}