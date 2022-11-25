import { Request, Response } from "express"
import Category from "../../models/Category";


const listCategories = async (req: Request, res: Response) => {
    try {
        const categories = await Category.find({}, {createdAt: 0});

        return res.status(200).json(categories);
    } catch (error) {
        return res.status(500).json('Erro ao retornar as categorias!');
    }
}

export default listCategories;
