import { Request, Response } from "express";
import { Category } from "../interfaces/category.interface";
import categoryModel from "../models/category.model";

class CategoryController {

    async findCategorysByUser(req: Request, res: Response) {
        const user = req.user;
        console.log(req.user);
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
        } catch(err) {
            res.status(400).json({
                ok: false,
                msg: `An error ocurred while trying find all documents, error: ${err}`
            });
        }
    }

    async createCategory(req: Request, res: Response) {
        const category: Category = req.body;
        category.user = req.user!.user;
        try{
          const categoryQuery = new categoryModel(category);
          await categoryQuery.save();
          res.status(200).json({
            ok: true,
            msg: 'Category create successfully'
          })

        } catch(err) {
            res.status(400).json({
                ok: false,
                msg: `An error ocurred while trying persist a new category, error: ${ err }`
            })
        }
    }
}

export default new CategoryController();