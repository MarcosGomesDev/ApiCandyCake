import { Request, Response } from "express";
import TokenForgotPassword from "../../models/TokenForgotPassword";

const verifyTokenIsValid = async (req: Request, res: Response) => {
    const {token} = req.body

    try {
        const verifyToken = await TokenForgotPassword.findOne({token: token})

        if (!verifyToken) {
            return res.status(401).json("Token inválido ou expirado!");
        }

        return res.status(200).json('Token verificado!')
    } catch (error) {
        return res.status(500).json('Erro, tente novamente mais tarde')
    }
}

export default verifyTokenIsValid;
