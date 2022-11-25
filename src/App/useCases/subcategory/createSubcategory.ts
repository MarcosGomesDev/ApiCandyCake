import { Request, Response } from "express";
import Category from "../../models/Category";
import Subcategory from "../../models/Subcategory";
import User from "../../models/User";


const createSubcategory = async (req: Request, res: Response) => {
    const { userAuth } = req
    const { name } = req.body

    if (!userAuth) {
        return res.status(401).json('Invalid authorization')
    }


    const user = await User.findOne({ _id: userAuth })

    if (user!.admin === false) {
        return res.status(401).json('Invalid authorization, u are not administrator')
    }

    const categoryExist = await Subcategory.findOne({ name: name });

    console.log(categoryExist)

    if (categoryExist) {
        return res.status(401).json('Categoria já existe');
    }

    try {
        const subcategory = new Subcategory({
            name,
            createdBy: userAuth
        })

        await subcategory.save()

        return res.status(201).json('Categoria criada com sucesso!');
    } catch (error) {
        return res.status(500).json('Erro ao criar categoria, tente novamente mais tarde!');
    }
}

export default createSubcategory;
