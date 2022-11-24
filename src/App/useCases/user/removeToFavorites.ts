import { Request, Response } from "express";
import moment from "moment";

import User from "../../models/User";

const date = moment().format('LLL')

const removeToFavorites = async (req: Request, res: Response) => {
    const {userAuth} = req
    const {id} = req.params

    try {
        await User.findOneAndUpdate({_id: userAuth}, {
            $pull: {
                favorites: id
            },
            updatedAt: date
        })

        return res.status(200).json('Removido da lista de favoritos')
    } catch (error) {
        return res.status(500).json('Erro ao remover dos favoritos, tente novamente mais tarde!')
    }
}

export default removeToFavorites;
