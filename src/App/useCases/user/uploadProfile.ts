import { Request, Response } from "express";
import moment from "moment";
import User from "../../models/User";
import cloud from "../../../helper/cloudinaryAuth";

const date = moment().format('LLL')

const uploadProfile = async (req: Request, res: Response) => {
    const { userAuth } = req

    if (!userAuth) {
        return res.status(401).json("Acesso não autorizado")
    }

    const user = await User.findOne({ _id: userAuth })

    if (user?.avatar) {
        await cloud.uploader.destroy(`${user.avatarId}`)
    }

    try {
        const result = await cloud.uploader.upload(req.file.path, {
            public_id: `${user!._id}_profile`,
            width: 500,
            height: 500,
            crop: 'fill',
            folder: 'Avatars Users'
        })

        await User.findByIdAndUpdate(user?._id, {
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

export default uploadProfile;
