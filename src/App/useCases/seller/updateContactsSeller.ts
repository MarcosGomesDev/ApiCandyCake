import { Request, Response } from "express";
import moment from "moment";

import Seller from "../../models/Seller";

const date = moment().format('LLL');

const updateContactsSeller = async (req: Request, res: Response) => {
    const {sellerAuth} = req
    const {instagram, whatsapp, facebook} = req.body

    try {
        const seller = await Seller.findById(sellerAuth)

        if(!seller) {
            return res.status(400).json('Este usuário não existe!')
        }

        await seller.updateOne({
            $set: {
                socialMedias: {
                    instagram: instagram,
                    whatsapp: whatsapp,
                    facebook: facebook
                },
                updatedAt: date
            }
        });

        const data = await Seller.findById(sellerAuth)

        return res.status(201).json({message: 'Dados atualizados com sucesso', data: data!.socialMedias});
    } catch (error) {
        return res.status(500).json('Erro ao atualizar dados do vendedor')
    };
};

export default updateContactsSeller;
