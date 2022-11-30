import { Request, Response } from "express";
import getDistanceInKm from "../../../utils/getDistance";
import Product from "../../models/Product";


const searchProduct = async (req: Request, res: Response) => {
    const { name, longitude, latitude } = req.query
    let { page, limit, rating, range }: any = req.query
    const regex = new RegExp(`${name}`, 'i')
    if (!page) page = 1;
    if (!rating) rating = 0;
    if (!range) range = 5;
    if (!limit) limit = 20;
    const skip = (page - 1) * 10;

    try {

        const products = await Product.find({
            name: {
                $in: regex
            }
        }, { name: 1, price: 1, images: 1, ratingAverage: 1 })
            .populate({
                path: 'category',
                select: ['name']
            })
            .populate({
                path: 'subcategory',
                select: ['name']
            })
            .populate({
                path: 'seller',
                select: ['location', 'name', 'storename']
            }).skip(skip).limit(limit).exec()

        const productsDistances: any[] = []

        products.map((product) => {
            let distance = getDistanceInKm(latitude, longitude,
                product.seller.location.coordinates[1], product.seller.location.coordinates[0])

            productsDistances.push({ distance: parseFloat(distance) })
        })

        const list = products.map((item, i) => ({ ...item._doc, ...productsDistances[i] }))
            .filter((item) => item.distance <= range! && item.ratingAverage >= rating!)

        const result = list.sort((a, b) => a.distance - b.distance)

        return res.status(200).json(result)

    } catch (error) {
        console.log(error)
        return res.status(500).json('Erro ao retornar produtos com esse filtro')
    }
}

export default searchProduct
