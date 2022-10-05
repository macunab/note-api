import { Application, NextFunction, Request, Response } from 'express';
import { check } from 'express-validator';
import passport from 'passport';
import noteController from '../controllers/note.controller';
import { CommonRoutesConfig } from "../helper/CommonRoutesConfig";
import userAuthentication from '../middlewares/userAuthentication';


export class NoteRoute extends CommonRoutesConfig {
    constructor(app: Application) {
        super(app, 'NoteRoutes');
    }

    configureRoutes(): Application {
        this.app.route('/notes')
            .get(
                passport.authenticate('jwt', { session: false }),
                userAuthentication.isAuthenticated,
                noteController.findNotesByUser
            );
        this.app.route('/notes')
            .post(
                userAuthentication.isAuthenticated,
                check('title', 'the title is required').not().isEmpty(),
                check('content', 'the content is required').not().isEmpty(),
                noteController.createNote
            );
        this.app.route('/notes/:id')
            .all((req: Request, res: Response, next: NextFunction) => {
                next();
            })
            .get()
            .put(
                passport.authenticate('jwt', { session: false }),
                noteController.updateNote
            )
            .delete(
                passport.authenticate('jwt', { session: false }),
                noteController.deleteNote
            );
        return this.app;
    }
}