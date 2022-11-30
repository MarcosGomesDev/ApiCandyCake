import { Express, Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

import endpoins from '../../../endpoints.config';

import User from "../models/User";

interface TokenPayload {
    id: string;
    iat: number;
    exp: number;
}

const isUserAuth = async (req: Request, res: Response, next: NextFunction) => {
    if (req.headers && req.headers.authorization) {
        console.log(req.headers.authorization)
        const token = req.headers.authorization.split(' ')[1]

        try {
            const decode = jwt.verify(token, `${process.env.SECRET}`)
            const {id} = decode as TokenPayload
            const userAuth = await User.findById(id)
            if (!userAuth) {
                return res.status(401).json('Autorização inválida do usuário!')
            }

            req.userAuth = id
            return next()
        } catch (error: any) {
            if (error.name === 'JsonWebTokenError') {
                return res.status(400).json('Autorização inválida do usuário!')
            }
            if (error.name === 'TokenExpiredError') {
                return res.status(413).json('Sessão expirada, por favor faça login')
            }
            return res.status(500).json('Internal Server Error')
        }
    } else {
        return res.status(400).json('Autorização inválida!')
    }
}

export default isUserAuth;
