import { Request, Response } from "express";
import moment from "moment";
import cloud from "../../../helper/cloudinaryAuth";
import Category from "../../models/Category";
import Product from "../../models/Product";
import Seller from "../../models/Seller";
import Subcategory from "../../models/Subcategory";

const date = moment().format('LLL')

const createProduct = async (req: Request, res: Response) => {
    const { sellerAuth } = req

    const { name, price, description, category, subcategory } = req.body

    if (!name) {
        return res.status(401).json('Por favor insira o nome do produto')
    }

    if (!price) {
        return res.status(401).json('Por favor insira o preço do produto')
    }

    if (!description) {
        return res.status(401).json('Por favor insira a descrição do produto')
    }

    const categorySend = await Category.findOne({ name: category })

    if (!categorySend) {
        return res.status(401).json('Categoria não existe, por favor escolha outra')
    }

    const subCategorySend = await Subcategory.findOne({ name: subcategory })

    if (!subCategorySend) {
        return res.status(401).json('Sub Categoria não existe, por favor escolha outra')
    }

    try {
        const images = []
        const publicImages = []

        for (let i = 0; i < req.files!.length; i++) {
            const file = req.files[i]

            const result = await cloud.uploader.upload(file.path, {
                public_id: `${file.filename}-${Date.now()}`,
                width: 500,
                height: 500,
                crop: 'fill',
                folder: "Products Images"
            })
            images.push(result.secure_url)
            publicImages.push(result.public_id)
        }

        const product = await Product.create({
            name,
            price: price.replace(',', '.'),
            description,
            seller: sellerAuth,
            images,
            publicImages,
            category: categorySend._id,
            subcategory: subCategorySend._id,
            createdAt: date
        })


        const seller = await Seller.findOne({ _id: sellerAuth })

        seller!.products.push(product._id)

        await seller!.save()
        await product.save()


        return res.status(201).json('Produto criado com sucesso!')

    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

export default createProduct;
