import express from 'express';
import cors from 'cors';

import './Database'

const app = express();

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log('server on');
});
