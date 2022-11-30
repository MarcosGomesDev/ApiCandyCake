import { Request, Response } from 'express';
import User from '../../models/User';

const listFavorites = async (req: Request, res: Response) => {
    const {userAuth} = req

    try {
        const userExist = await User.findOne({_id: userAuth})
        .populate({path: 'favorites',
            populate: 'seller',
        });

        return res.status(200).json(userExist?.favorites)
    } catch (error) {
        return res.status(500).json('Erro ao retornar os favoritos, tente novamente mais tarde!')
    }
}

export default listFavorites;
