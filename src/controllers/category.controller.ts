import { Request, Response } from "express";
import categoryModel from "../models/category.model";

class CategoryController {

    async findCategorysByUser(req: Request, res: Response) {
        const user = req.user;
        if(!user) {
            return res.status(400).json({
                ok: false,
                msg: 'user not authenticated'
            })
        }
        try {
            const categorys = await categoryModel.find({ user: user});
            res.status(200).json({
                ok: true,
                msg: 'All documents found successfully',
                data: categorys
            });
        } catch(error) {
            res.status(400).json({
                ok: false,
                msg: `An error ocurred while trying find all documents, error: ${error}`
            });
        }
    }

    async createCategory(req: Request, res: Response) {
        
    }
}

export default new CategoryController();