import mongoose from "mongoose";

interface IPoint {
    type: string,
    coordinates: Array<number>
}

const PointSchema = new mongoose.Schema<IPoint>({
    type: {
        type: String,
        enum: ['Point'],
        required: true,
    },
    coordinates: {
        type: [Number],
        required: true,
    }
});

/**Aqui eu especifico como serão os campos de coordenadas la
 * do meu modelo de Dev, pela documentação do mongo devo fazer isso em um arquivo separado
 * Primeiro a ser passado sempre = longitude
 * segundo a ser passado sempre = latitude
 * No google o esquema é 1° do query lat e o 2° long
 */

export default PointSchema;
