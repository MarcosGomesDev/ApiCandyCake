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

        const dados = await Seller.findById(sellerAuth)

        const data = {
            name: dados!.name,
            lastname: dados!.lastname,
            storename: dados!.storename,
            email: dados!.email
        }

        return res.status(201).json({message: 'Dados atualizados com sucesso', data: data});
    } catch (error) {
        return res.status(500).json('Erro ao atualizar dados do vendedor')
    };
};

export default updateSeller;
