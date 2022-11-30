import { Request, Response } from "express"
import Product from "../../models/Product"


const removeReplyRating = async (req: Request, res: Response) => {
    const { sellerAuth } = req
    const { replyId } = req.params

    try {
        await Product.updateMany({ "rating._id": replyId },
            {
                $pull: {
                    "rating.$[element].replyRating": {
                        sellerId: sellerAuth
                    }
                }
            },
            { arrayFilters: [{ "element._id": replyId }] }
        )

        return res.status(201).json("Resposta excluida com sucesso!")
    } catch (error) {
        console.log(error)
        return res.status(500).json('Erro ao excluir resposta, tente novamente mais tarde!')
    }
}

export default removeReplyRating
