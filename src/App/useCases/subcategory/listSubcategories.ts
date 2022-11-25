import { Request, Response } from "express";
import Subcategory from "../../models/Subcategory";


const listSubcategories = async (req: Request, res: Response) => {
    try {
        const subcategories = await Subcategory.find({}, {createdAt: 0});

        return res.status(200).json(subcategories)
    } catch (error) {
        return res.status(500).json('Erro ao retornar as subcategorias!');
    }
}

export default listSubcategories;
