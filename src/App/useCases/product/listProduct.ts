import { Request, Response } from "express"
import Product from "../../models/Product"


const listProduct = async (req: Request , res: Response) => {
    const { id } = req.params

    try {
        const product = await Product.findOne({ _id: id }, {createdAt: 0, publicImages: 0})
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

        return res.status(200).json(product)
    } catch (error) {
        console.log(error)
        return res.status(500).json('Internal Server Error')
    }
}

export default listProduct;
