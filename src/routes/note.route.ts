import { Application } from "express";
import { CommonRoutesConfig } from "../helper/CommonRoutesConfig";


export class NoteRoute extends CommonRoutesConfig {
    constructor(app: Application) {
        super(app, 'NoteRoutes');
    }

    configureRoutes(): Application {
        
        return this.app;
    }
}