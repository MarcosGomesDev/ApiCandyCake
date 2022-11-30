import { Request, Response } from "express"
import Product from "../../models/Product"

const listSeller = async (req: Request, res: Response) => {
    const { sellerAuth } = req

    try {
        const products = await Product.find(
            { seller: sellerAuth },
            { publicImages: 0, createdAt: 0, updatedAt: 0 }
        )
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
                select: ['storename']
            })


        return res.status(200).json(products)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

export default listSeller;
