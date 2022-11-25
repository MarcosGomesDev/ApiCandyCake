import { Request, Response } from "express"
import Product from "../../models/Product"
import User from "../../models/User"


const replyRating = async (req: Request , res: Response) => {
    const { sellerAuth } = req
    const { id } = req.params
    const { replyComment } = req.body

    try {
        const user = await User.findById(sellerAuth)

        await Product.updateMany({ "rating._id": id },
            {
                $set: {
                    "rating.$[element].replyRating": {
                        sellerId: sellerAuth,
                        sellerName: user!.name,
                        replyReview: replyComment
                    }
                }
            },
            { arrayFilters: [{ "element._id": id }] }
        )

        return res.status(201).json('Resposta enviada com sucesso!')
    } catch (error) {
        return res.status(500).json('Internal Server Error')
    }
}

export default replyRating
