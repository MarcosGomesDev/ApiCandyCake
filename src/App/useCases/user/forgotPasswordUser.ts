import { Request, Response } from "express";
import sendEmail from "../../../utils/sendEmail";
import TokenForgotPassword from "../../models/TokenForgotPassword";
import User from "../../models/User";

const forgotPasswordUser = async (req: Request, res: Response) => {
    const { email } = req.body

    const user = await User.findOne({ email: email })

    if (!user) {
        return res.status(401).json('Usuário não encontrado');
    }

    try {
        const token = await TokenForgotPassword.findOne({ id: user._id });

        if (token !== null) {
            await TokenForgotPassword.findByIdAndDelete({ _id: token._id })
        }

        const sort = Math.floor(100000 + Math.random() * 900000)
        const newResetToken = await new TokenForgotPassword({
            id: user._id,
            token: sort,
            expiresIn: 300,
        }).save();

        const link = `${newResetToken.token}`;
        console.log(link)
        await sendEmail(user.email, "Redefinir senha"
            , `Seu código de redefinição de senha é: ${link}, Token válido por 5 minutos!`
        )

        return res.status(200).json("Token de redefinição de senha foi enviado ao email");

    } catch (error) {
        return res.status(500).json('Erro ao enviar token, tente novamente mais tarde!')
    }
}

export default forgotPasswordUser;
