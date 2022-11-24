import { Request, Response } from "express";
import Seller from "../../models/Seller";

const deleteSeller = async (req: Request, res: Response) => {
    const {sellerAuth} = req
    try {
        await Seller.findByIdAndDelete(sellerAuth);

        return res.status(201).json('Vendedor deletado com sucesso')
    } catch (error) {
        return res.status(500).json('Erro ao deletar usuário!')
    }
}

export default deleteSeller;
