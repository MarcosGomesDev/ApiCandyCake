import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import moment from 'moment';
import CepCoords from 'coordenadas-do-cep';

import Seller from '../../models/Seller';

const date = moment().format('LLL')

const createSeller = async (req: Request, res: Response) => {
    const {
        name,
        lastname,
        storename,
        email,
        password,
        cep,
        logradouro,
        numero,
        complemento,
        bairro,
        localidade,
        UF
    } = req.body

    console.log(req.body)

    //Validations
    if(!name) return res.status(401).json('O nome é obrigatório!');

    if(!email) return res.status(401).json('O email é obrigatório!');

    if(!storename) return res.status(401).json('O nome da loja é obrigatório!');

    if(!password) return res.status(401).json('A senha é obrigatória!');

    //VERIFICA SE O CEP DO ENDEREÇO FOI INSERIDO
    if(!cep) return res.status(401).json('O cep é obrigatório!');

    //VERIFICA SE O ENDEREÇO FOI INSERIDO
    if(!logradouro) return res.status(401).json('O nome da rua é obrigatório!');

    //VERIFICA SE O NÚMERO DO ENDEREÇO FOI INSERIDO
    if(!numero) return res.status(401).json('O número do endereço é obrigatório!');

    //VERIFICA SE O BAIRRO FOI INSERIDO
    if(!bairro) return res.status(401).json('O bairro é obrigatório!');

    //VERIFICA SE A CIDADE FOI INSERIDA
    if(!localidade) return res.status(401).json('A cidade é obrigatória!');

    //VERIFICA SE O ESTADO FOI INSERIDO
    if(!UF) return res.status(401).json('O estado é obrigatório!');

    try {
        // VERIFIED IF SELLER EXISTS
        const sellerExist = await Seller.findOne({email: email})

        if(sellerExist) {
            return res.status(401).json('Este email já está sendo utilizado!')
        }

        //OBTÉM A LATITUDE E LONGITUDE DO ENDEREÇO
        const info = await CepCoords.getByCep(cep)

        // HASHING THE PASSWORD
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        // METHOD OF SAVE NEW SELLER
        const seller = new Seller({
            name,
            lastname,
            storename,
            email,
            seller: true,
            admin: false,
            password: passwordHash,
            location: {
                type: 'Point',
                coordinates: [info.lon, info.lat],
            },
            address: [{
                cep: cep,
                street: logradouro,
                number: numero,
                complement: complemento,
                neighborhood: bairro,
                city: localidade,
                state: UF
            }],
            createdAt: date
        });

        // SAVE NEW SELLER
        await seller.save()

        // AFTER SAVE SHOW THIS
        return res.status(201).json('Vendedor criado com sucesso!')
    } catch (error) {
        console.log(error)
        return res.status(500).json('Erro ao criar usuário, tente novamente mais tarde!')
    }
}

export default createSeller;
