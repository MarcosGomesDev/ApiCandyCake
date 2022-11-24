import { Request, Response } from "express";

import User from "../../models/User";

const updateUser = async (req: Request, res: Response) => {
    const {userAuth} = req
    const {name, lastname, email} = req.body;

    try {
        await User.findByIdAndUpdate({_id: userAuth}, {
            $set: {
                name,
                lastname,
                email
            }
        })

        return res.status(200).json('Dados atualizados com sucesso!');
    } catch (error) {
        return res.status(500).json('Erro ao atualizar dados do usuário, tente novamente mais tarde!');
    }
}

export default updateUser;
