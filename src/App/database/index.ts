import mongoose from 'mongoose';

import endpointsConfig from '../../../endpoints.config';

mongoose.connect(`${endpointsConfig.MONGO_URI}`)
    .then(() => {
        console.log('our db as connect')
    })
    .catch((err) => console.log(err))
