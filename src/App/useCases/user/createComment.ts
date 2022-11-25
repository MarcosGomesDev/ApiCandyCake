import { Request, Response } from "express"
import { averageOfArray, sumOfArray } from "../../../utils/AverageFunction";
import Product from "../../models/Product"
import User from "../../models/User"


const createComment = async (req: Request , res: Response) => {
    const { userAuth } = req
    const { id } = req.params
    const { comment, rating_selected } = req.body

    if (!comment) {
        return res.status(400).json('O comentário não pode ser vazio')
    }

    if (!rating_selected) {
        return res.status(400).json('Nota inválida')
    }

    // verify if the rating is inside the scope
    if (rating_selected > 5 || rating_selected < 1) {
        return res.status(400).json("Nota de avaliacao inválida")
    }

    try {

        const product = await Product.findById(id)
            .populate('seller')
            .populate('category')
            .populate('subcategory')

        const user = await User.findById(userAuth)

        if (product!.rating.length >= 1) { // checking if we have 1 or more ratings
            // search for the previous rating of the user for this product
            const userRatingIdentifier = userAuth; // .toString() -> if necessary - retorna um tipo Object

            const previousUserRating = await Product.find({ _id: id },
                { rating: { $elemMatch: { userId: userRatingIdentifier } } })
            // console.log(previousUserRating) // to be tested

            // check if the user has at least 1 rating among product's rating
            if (previousUserRating[0].rating[0] === undefined) { // if he doesn't

                // creating a new rating
                console.log('Criando uma nova avaliação para o usuário')
                await product!.updateOne({
                    $push: {
                        rating: [{
                            userName: user?.name,
                            userId: userAuth,
                            productRating: rating_selected,
                            productReview: comment
                        }]
                    }
                });

                // add the new rate value to the array of rates
                await product!.updateOne({
                    $push: {
                        ratingNumbers: rating_selected
                    }
                });

            } else {
                // if the user already has a rating for the product
                const previousUserRatingValue = previousUserRating[0].rating[0].productRating;

                // update the old rating of the user
                await Product.updateMany({ "rating.userId": userRatingIdentifier },
                    {
                        $set: {
                            "rating.$[element].userName": user?.name,
                            "rating.$[element].userId": userAuth,
                            "rating.$[element].productRating": rating_selected,
                            "rating.$[element].productReview": comment

                        }
                    },
                    { arrayFilters: [{ "element.userId": userRatingIdentifier }] }
                );

                // replace the old value of rating by the new one, inside the array of ratings
                await Product.updateOne({ _id: id, ratingNumbers: previousUserRatingValue },
                    { $set: { "ratingNumbers.$": rating_selected } }
                )
            };

        } else if (product!.rating.length < 1) {
            // create the first rating for the product
            console.log('Nenhuma avaliação existente para este produto, criando uma nova')
            // console.log(user)
            // console.log("#####################################################################")
            // console.log(product)
            await product!.updateOne({
                $push: {
                    rating: {
                        userName: user?.name,
                        userId: userAuth,
                        productRating: rating_selected,
                        productReview: comment
                    },
                }
            });

            await product!.updateOne({
                $push: {
                    ratingNumbers: rating_selected
                }
            })
        }

        product!.save()
    } catch (error) {
        return res.status(500).json('Internal Server Error')
    }

    try { // Calcs
        // totally updated product, used to do the average calcs
        const productUpdated = await Product.findById(id)
            .populate('seller')
            .populate('category')
            .populate('subcategory')

        await productUpdated!.updateOne({
            $set: {
                ratingSum: sumOfArray(productUpdated!.ratingNumbers),
                ratingAverage: averageOfArray(productUpdated!.ratingNumbers)
            }
        },
            { new: true },
        );

        productUpdated!.save()
    } catch (error) {
        return res.status(500).json('Internal server error')
    }

    return res.status(201).json('Avaliação inserida com sucesso!')
}

export default createComment
