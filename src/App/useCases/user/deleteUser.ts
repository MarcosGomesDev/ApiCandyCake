import { Request, Response } from "express";
import User from "../../models/User";

const deleteUser = async (req: Request, res: Response) => {
    const {userAuth} = req
    try {
        await User.findByIdAndDelete(userAuth);

        return res.status(201).json('Usuário deletado com sucesso')
    } catch (error) {
        return res.status(500).json('Erro ao deletar usuário!')
    }
}

export default deleteUser;
