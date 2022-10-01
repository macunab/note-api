import { Request, Response } from "express";
import { User } from "../interfaces/user.interface";


class NoteController {

    async findNotesByUser(req: Request, res: Response) {
        const user = req.user;
        if(!user) {
            return res.status(400).json({
                ok: false,
                msg: 'user not authenticated'
            });
        }
    }

    async createNote(req: Request, res: Response) {

    }

    async updateNote(req: Request, res: Response) {

    }

    async deleteNote(req: Request, res: Response) {

    }
}

export default new NoteController();