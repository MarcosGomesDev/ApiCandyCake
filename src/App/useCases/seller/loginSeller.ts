import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import endpoints from "../../../../endpoints.config";
import jwt from "jsonwebtoken";

import Seller from "../../models/Seller";



const loginSeller = async (req: Request, res: Response) => {
    const { email, password } = req.body

    try {
        const seller = await Seller.findOne({ email: email })

        if (!seller) {
            return res.status(401).json('Usuário não existe!')
        }

        const checkPassword = bcrypt.compare(password, seller.password)

        if (!checkPassword) {
            return res.status(401).json('Senha inválida!')
        }

        const token = jwt.sign({
            id: seller._id
        }, `${process.env.SECRET}`, { expiresIn: '1d' })

        const data = {
            _id: seller._id,
            name: seller.name,
            lastname: seller.lastname,
            email: seller.email,
            avatar: seller.avatar,
            seller: seller.seller,
            admin: seller.admin,
            token: token,
        }

        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(500).json('internal server error')
    }
}

export default loginSeller;
