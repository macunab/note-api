import { Request, Response } from "express";
import { Category } from "../interfaces/category.interface";
import { User } from "../interfaces/user.interface";
import categoryModel from "../models/category.model";
import userModel from '../models/user.model';

class CategoryController {

    async findCategoriesByUser(req: Request, res: Response) {
        const requestUser: User = req.user?.user;
        try {
            const user = await userModel.findById(requestUser._id);
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
          //console.log(`LA CATEGORIA CREADA ES: ${ categoryQuery }`);
          await categoryQuery.save();
          res.status(200).json({
            ok: true,
            data: categoryQuery,
            msg: 'Category create successfully'
          })

        } catch(err) {
            res.status(400).json({
                ok: false,
                msg: `An error ocurred while trying persist a new category, error: ${ err }`
            })
        }
    }

    async deleteCategory(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await categoryModel.deleteOne({ _id: id });
            res.status(200).json({
                ok: true,
                msg: 'the category was delete successfully'
            });
        } catch(err) {
            res.status(400).json({
                ok: false,
                msg: 'An error ocurred while trying delete a document'
            });
        }
    }

    async updateCategory(req: Request, res: Response) {
        const category: Category = req.body;
        const { id } = req.params;
        try {
            await categoryModel.findByIdAndUpdate( id, category );
            res.status(200).json({
                ok: true,
                msg: 'The category was updated successfully'
            });
        } catch(err) {
            res.status(400).json({
                ok: false,
                msg: `An error ocurred while trying update a document, error: ${ err }`
            })
        }
    }

    async verifyName(req: Request, res: Response) {
        const { name } = req.body;
        const requestUser: User = req.user!.user;
        try {
            const user = await userModel.findById(requestUser._id);
            const category = await categoryModel.findOne({ name: name, user: user});
            //console.log(category);
            if(category) {
                return res.status(200).json({
                    ok: false,
                    msg: 'the category was found'
                })
            } else {
                res.status(200).json({
                    ok: true,
                    msg: 'the category wasnt found'
                })
            }
        } catch(err) {
            res.status(400).json({
                ok: false,
                msg: 'An error ocurred while trying verify the category name'
            })
        }
    }
}

export default new CategoryController();