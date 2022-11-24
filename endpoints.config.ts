import * as dotenv from 'dotenv';

dotenv.config()

export default {
    Secret: process.env.SECRET ?? '',
    MONGO_URI: process.env.MONGO_URI ?? ''
}
