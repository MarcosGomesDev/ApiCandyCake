import { Request, Response } from "express"
import cloud from "../../../helper/cloudinaryAuth"
import Product from "../../models/Product"
import Seller from "../../models/Seller"
import User from "../../models/User"


const deleteProduct = async (req: Request , res: Response) => {
    const { sellerAuth } = req
    const { id } = req.params

    try {
        const prod = await Product.findById({ _id: id })
        for (let index = 0; index < prod!.publicImages.length; index++) {
            const file = prod!.publicImages[index]

            await cloud.uploader.destroy(file)
        }
        await Product.findByIdAndDelete({ _id: id })
        await Seller.findOneAndUpdate({ products: id },
            {
                $pull: {
                    products: id
                }
            }
        )

        await User.findOneAndUpdate({ favorites: id },
            {
                $pull: {
                    favorites: id
                }
            }
        )

        return res.status(200).json('Produto deletado com sucesso')
    } catch (error) {
        console.log(error)
        return res.status(500).json('Erro ao deletar o produto')
    }
}

export default deleteProduct
