import { Request, Response } from "express"
import moment from "moment"
import cloud from "../../../helper/cloudinaryAuth"
import Category from "../../models/Category"
import Product from "../../models/Product"
import Subcategory from "../../models/Subcategory"

const date = moment().format('LLL')

const updateProduct = async (req: Request, res: Response) => {
    const { sellerAuth } = req
    const { id } = req.params
    const { name, price, description, category, subcategory } = req.body

    if (!id) {
        return res.status(400).json('Produto não existe!')
    }

    if (!name) {
        return res.status(400).json('O nome não pode ser vazio!')
    }

    if (!price) {
        return res.status(400).json('O preço não pode ser vazio!')
    }

    if (!description) {
        return res.status(400).json('A descrição não pode ser vazia!')
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
        const product = await Product.findById(id)
            .populate('seller')
            .populate('category')
            .populate('subcategory')

        if (!product) {
            return res.status(400).json('Este produto não existe!')
        }

        const newImages = []
        const newPublicImages = []

        if (req.files.length > 0) {
            for (let i = 0; i < req.files.length; i++) {
                const file = req.files[i]

                const result = await cloud.uploader.upload(file.path, {
                    public_id: `${file.filename}-${Date.now()}`,
                    width: 500,
                    height: 500,
                    crop: 'fill',
                    folder: "Products Images"
                })
                newImages.push(result.secure_url)
                newPublicImages.push(result.public_id)
            }
        }

        await product.updateOne({
            $set: {
                name: name !== product.name ? name : product.name,
                price: price !== product.price ? price : product.price,
                category: categorySend._id !== product.category._id ? categorySend : product.category,
                subcategory: subCategorySend._id !== product.subcategory._id ? subCategorySend : product.subcategory,
                images: req.files.length > 0 ? newImages : product.images,
                publicImages: req.files.length > 0 ? newPublicImages : product.publicImages,
                updatedAt: date
            }
        })

        return res.status(201).json('Produto atualizado com sucesso!')
    } catch (error) {
        console.log(error)
        return res.status(500).json('Erro ao atualizar dados do produto, tente novamente mais tarde!')
    }
}

export default updateProduct;
