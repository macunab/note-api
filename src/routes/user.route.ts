import { Application } from "express";
import { CommonRoutesConfig } from "../helper/CommonRoutesConfig";

export class UserRoute extends CommonRoutesConfig {

    constructor(app: Application) {
        super(app, 'UserRoute');
    }

    configureRoutes(): Application {
        
        return this.app;
    }
}