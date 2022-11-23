import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/CandyCake')
    .then(() => {
        console.log('our db as connect')
    })
    .catch((err) => console.log(err))
