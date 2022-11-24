import { Request, Response } from "express";
import TokenForgotPassword from "../../models/TokenForgotPassword";
import Seller from "../../models/Seller";
import bcrypt from 'bcrypt';
import moment from "moment";

const date = moment().format('LLL')

const changeSellerPassword = async (req: Request, res: Response) => {
    const { password } = req.body
    const { token } = req.params

    try {
        if (!password) {
            return res.status(401).json("Por favor insira a senha!")
        }

        const validToken = await TokenForgotPassword.findOne({ token: token });

        if (!validToken) {
            return res.status(401).json("Token inválido ou expirado!");
        }

        const seller = await Seller.findOne({ _id: validToken.id })

        const checkPassword = await bcrypt.compare(password, seller!.password)

        if(checkPassword) {
            return res.status(401).json('A senha deve ser diferente da anterior!')
        }

        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        console.log(passwordHash, seller?.password)

        await Seller.findOneAndUpdate({ _id: seller?._id }, {
            $set: {
                password: passwordHash,
                updatedAt: date
            }
        })

        await validToken.delete()

        return res.status(200).json("Senha alterada com sucesso!");
    } catch (error) {
        console.log(error)
        return res.status(500).json('Erro interno, tente novamente mais tarde!')
    }
}

export default changeSellerPassword;
