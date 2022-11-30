import express from 'express';
import cors from 'cors';
import path from 'node:path'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import './app/database'

import userRoutes from './routes/userRoutes';
import sellerRoutes from './routes/sellerRoutes';
import categoryRoutes from './routes/categoryRoutes';
import subcategoryRoutes from './routes/subcategoryRoutes';
import productRoutes from './routes/productRoutes';

dotenv.config();

const app = express();

app.use(cors())
app.use(express.json())
app.use(cookieParser())
// app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(userRoutes)
app.use(sellerRoutes)
app.use(categoryRoutes)
app.use(subcategoryRoutes)
app.use(productRoutes)

app.listen(3003, () => {
    console.log('server on');
});
