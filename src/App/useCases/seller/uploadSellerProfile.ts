import { Request, Response } from "express";
import moment from "moment";
import Seller from "../../models/Seller";
import cloud from "../../../helper/cloudinaryAuth";

const date = moment().format('LLL')

const uploadSellerProfile = async (req: Request, res: Response) => {
    const { sellerAuth } = req

    if (!sellerAuth) {
        return res.status(401).json("Acesso não autorizado")
    }

    const seller = await Seller.findOne({ _id: sellerAuth })

    if (seller?.avatar) {
        await cloud.uploader.destroy(`${seller.avatarId}`)
    }

    try {
        const result = await cloud.uploader.upload(req.file.path, {
            public_id: `${seller!._id}_profile`,
            width: 500,
            height: 500,
            crop: 'fill',
            folder: 'Avatars Users'
        })

        await Seller.findByIdAndUpdate(seller?._id, {
            $set: {
                avatar: result.secure_url,
                avatarId: result.public_id,
                updatedAt: date
            }
        })

        return res.status(201).json({ message: 'Imagem alterada com sucesso', avatar: result.secure_url })

    } catch (error) {
        console.log(error)
        return res.status(500).json('Erro interno no servidor')
    }
}

export default uploadSellerProfile;
