import { Request, Response } from "express";
import sendEmail from "../../../utils/sendEmail";
import TokenForgotPassword from "../../models/TokenForgotPassword";
import Seller from "../../models/Seller";

const forgotPasswordSeller = async (req: Request, res: Response) => {
    const { email } = req.body

    const seller = await Seller.findOne({ email: email })

    if (!seller) {
        return res.status(401).json('Usuário não encontrado');
    }

    try {
        const token = await TokenForgotPassword.findOne({ id: seller._id });

        if (token !== null) {
            await TokenForgotPassword.findByIdAndDelete({ _id: token._id })
        }

        const sort = Math.floor(100000 + Math.random() * 900000)
        const newResetToken = await new TokenForgotPassword({
            id: seller._id,
            token: sort,
            expiresIn: 300,
        }).save();

        const link = `${newResetToken.token}`;
        console.log(link)
        await sendEmail(seller.email, "Redefinir senha"
            , `Seu código de redefinição de senha é: ${link}, Token válido por 5 minutos!`
        )

        return res.status(200).json("Token de redefinição de senha foi enviado ao email");

    } catch (error) {
        return res.status(500).json('Erro ao enviar token, tente novamente mais tarde!')
    }
}

export default forgotPasswordSeller;
