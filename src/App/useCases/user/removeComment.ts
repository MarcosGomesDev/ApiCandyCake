import { Request, Response } from "express";
import { averageOfArray, sumOfArray } from "../../../utils/AverageFunction";
import Product from "../../models/Product";


const removeComment = async (req: Request , res: Response) => {
    const { userAuth } = req; // o user já vai pra requisição pelo "isAuth" chamado na rota
    const { id } = req.params;//id do produto a ser avaliado

    try {
        const product = await Product.findById(id)
            .populate('seller')
            .populate('category')
            .populate('subcategory')

        let productDelete = await Product.findOne({ _id: id })

        let oldRating = productDelete!.rating

        const result = oldRating.find(i => i.userId.toString() === userAuth.toString())

        await product!.updateOne(
            {
                $pull: {
                    rating: {
                        userId: userAuth
                    },
                    ratingNumbers: result!.productRating
                },
            })
    } catch (error) {
        console.log(error)
        return res.status(500).json('Internal Server Error')
    }

    try { // Calcs
        // totally updated product, used to do the average calcs
        const productUpdated = await Product.findById(id)
            .populate('seller')
            .populate('category')
            .populate('subcategory')

        if (productUpdated!.ratingNumbers.length === 0) {
            await productUpdated!.updateOne({
                $set: {
                    ratingSum: 0,
                    ratingAverage: 0
                }
            },
                { new: true },
            );
        } else {
            await productUpdated!.updateOne({
                $set: {
                    ratingSum: sumOfArray(productUpdated!.ratingNumbers),
                    ratingAverage: averageOfArray(productUpdated!.ratingNumbers)
                }
            },
                { new: true },
            );
        }

        productUpdated!.save()
    } catch (error) {
        return res.status(500).json('Internal server error')
    }

    return res.status(200).json('Avaliação excluída com sucesso!')
}

export default removeComment
