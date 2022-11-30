import { Request, Response } from "express";
import moment from "moment";
import Product from "../../models/Product";

import User from "../../models/User";

const date = moment().format('LLL')

const addToFavorites = async (req: Request, res: Response) => {
    const {userAuth} = req
    const {id} = req.params

    try {
        const list = []

            const product = await Product.findOne({_id: id});

            list.push(product)

            await User.findOneAndUpdate({_id: userAuth},
                {
                    $push: {
                        favorites: list,
                    },
                    updatedAt: date
                }
            )

        return res.status(200).json('Produto adicionado aos favoritos com sucesso!')
    } catch (error) {
        console.log(error)
        return res.status(500).json('Erro ao adicionar aos favoritos, tente novamente mais tarde!')
    }
}

export default addToFavorites;
