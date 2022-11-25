import { Request, Response } from "express"
import Product from "../../models/Product"


const listComments = async (req: Request , res: Response) => {
    const { id } = req.params

    try {
        const productWithComments = await Product.findOne({ _id: id })
            .populate({
                path: "rating.userId",
                select: ['avatar']
            })
            .populate({
                path: 'rating.replyRating.sellerId',
                select: ['avatar']
            })

        //RETORNA TODOS OS COMETÁRIOS DO PRODUTO
        const comments = productWithComments!.rating

        return res.status(200).json(comments)
    } catch (error) {
        return res.status(500).json('Internal Server Error')
    }
}

export default listComments;
