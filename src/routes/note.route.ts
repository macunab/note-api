import { Application, NextFunction, Request, Response } from 'express';
import { check } from 'express-validator';
import passport from 'passport';
import noteController from '../controllers/note.controller';
import { CommonRoutesConfig } from "../helper/CommonRoutesConfig";

export class NoteRoute extends CommonRoutesConfig {
    constructor(app: Application) {
        super(app, 'NoteRoutes');
    }

    configureRoutes(): Application {
        this.app.route('/notes')
            .get(
                passport.authenticate('jwt', { session: false }),
                noteController.findNotesByUser
            );
        this.app.route('/notes')
            .post(
                passport.authenticate('jwt', { session: false }),
                check('title', 'the title is required').not().isEmpty(),
                check('content', 'the content is required').not().isEmpty(),
                noteController.createNote
            );
        this.app.route('/notes/:id/:fav')
                .get(
                    passport.authenticate('jwt', { session: false }),
                    noteController.updateFav
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