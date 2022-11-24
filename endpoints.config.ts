import * as dotenv from 'dotenv';

dotenv.config()

export default {
    SECRET: process.env.SECRET ?? '',
    MONGO_URI: process.env.MONGO_URI ?? '',
    USER_EMAIL: process.env.USER_EMAIL ?? '',
    PASS: process.env.PASS ?? '',
    CLOUDNAME: process.env.CLOUDNAME ?? '',
    API_KEY: process.env.API_KEY ?? '',
    API_SECRET: process.env.API_SECRET ?? ''
}
