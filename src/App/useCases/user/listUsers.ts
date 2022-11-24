import { Request, Response } from 'express';

import User from '../../models/User';

const listUsers = async (req: Request, res: Response) => {
    const { userAuth } = req

    if (!userAuth) {
        return res.status(401).json('Autorização inválida');
    }

    const user = await User.findById(userAuth)

    if (user!.admin === false) {
        return res.status(401).json('Você não tem permissão para acessar!')
    }

    try {
        const users = await User.find();

        return res.status(200).json(users)
    } catch (error) {
        console.log(error)
        return res.status(500).json('Erro ao retornar os usuários, tente novamente mais tarde')
    }
}

export default listUsers;
