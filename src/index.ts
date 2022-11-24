import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import './app/database'
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(userRoutes)

app.listen(3003, () => {
    console.log('server on');
});
