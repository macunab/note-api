import { Request, Response } from "express";
import { Note } from "../interfaces/note.interface";
import { User } from "../interfaces/user.interface";
import noteModel from "../models/note.model";

class NoteController {

    async findNotesByUser(req: Request, res: Response) {
        const user: User = req.user!.user;
        try {
            const notes = noteModel.find({ user: user });
            res.status(200).json({
                ok: true,
                msg: 'All documents found successfully',
                data: notes
            });
        } catch(err) {
            res.status(400).json({
                ok: false,
                msg: `An error ocurred while trying find all documents, error: ${err}`
            });
        }
    }

    async createNote(req: Request, res: Response) {
        const note: Note = req.body;
        note.user = req.user?.user;
        try {
            const noteQuery = new noteModel(note);
            await noteQuery.save();
            res.status(200).json({
                ok: true,
                msg: 'the document was create successfully'
            })
        } catch(err) {
            res.status(400).json({
                ok: false,
                msg: `An error ocurred while trying create a note, error: ${ err }`
            });
        }
    }

    async updateNote(req: Request, res: Response) {

    }

    async deleteNote(req: Request, res: Response) {

    }
}

export default new NoteController();