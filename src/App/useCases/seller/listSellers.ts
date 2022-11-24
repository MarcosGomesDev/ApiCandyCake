import { Request, Response } from 'express';

import Seller from '../../models/Seller';

const listSellers = async (req: Request, res: Response) => {
    const { sellerAuth } = req

    if (!sellerAuth) {
        return res.status(401).json('Autorização inválida');
    }

    const seller = await Seller.findById(sellerAuth)

    if (seller!.admin === false) {
        return res.status(401).json('Você não tem permissão para acessar!')
    }

    try {
        const sellers = await Seller.find();

        return res.status(200).json(sellers)
    } catch (error) {
        console.log(error)
        return res.status(500).json('Erro ao retornar os vendedores, tente novamente mais tarde')
    }
}

export default listSellers;
