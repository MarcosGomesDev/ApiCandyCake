import { Request, Response } from "express"
import Product from "../../models/Product"


const listProductsBySeller = async (req: Request , res: Response) => {
    const { sellerId } = req.params

    try {
        const product = await Product.find({ seller: sellerId }, {createdAt: 0, publicImages: 0})
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
                select: ['name', 'storename', 'socialMedias']
            })

        return res.status(200).json(product)
    } catch (error) {
        console.log(error)
        return res.status(500).json('Internal Server Error')
    }
}

export default listProductsBySeller;
