import { Request, Response } from "express";
import moment from "moment";

import Seller from "../../models/Seller";

const date = moment().format('LLL');

const updateSeller = async (req: Request, res: Response) => {
    const {sellerAuth} = req
        const {name, lastname, storename, email} = req.body

    try {
        const seller = await Seller.findById(sellerAuth)

        if(!seller) {
            return res.status(400).json('Este usuário não existe!')
        }

        await seller.updateOne({
            $set: {
                name,
                lastname,
                email,
                storename,
                updatedAt: date
            }
        });

        return res.status(201).json('Dados atualizados com sucesso');
    } catch (error) {
        return res.status(500).json('Erro ao atualizar dados do vendedor')
    };
};

export default updateSeller;
