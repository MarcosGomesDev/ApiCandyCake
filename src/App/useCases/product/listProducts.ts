import { Request, Response } from "express";
import Product from "../../models/Product";


const listProducts = async (req: Request, res: Response) => {

    try {
        const products = await Product.find()
            .populate({
                path: 'category',
                select: ['name']
            })
            .populate({
                path: 'subcategory',
                select: ['name']
            })
            .populate({
                path: 'seller',
                select: ['name', 'socialMedias']
            })
            .populate('rating.userId')

        return res.status(200).json(products)
    } catch (error) {
        return res.status(500).json('Internal Server Error')
    }
}

export default listProducts;
