import { Request, Response } from "express"
import Product from "../../models/Product"

const listSeller = async (req: Request, res: Response) => {
    const { sellerAuth } = req

    try {
        const products = await Product.find({ seller: sellerAuth })
            .populate('seller')
            .populate('category')
            .populate('subcategory')

        return res.status(200).json(products)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export default listSeller;
