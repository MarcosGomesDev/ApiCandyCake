// const geolib = require('geolib')

import { getDistance } from 'geolib';

interface Props {
    latAtual: any,
    longAtual: any,
    latFinal: any,
    longFinal: any,
}

const getDistanceInKm = (latAtual: any, longAtual: any, latFinal: any, longFinal: any) => {
    let distanceInKm = getDistance({ latitude: latAtual, longitude: longAtual }, { latitude: latFinal, longitude: longFinal })
    const finalDistance = (distanceInKm / 1000).toFixed(1)

    return finalDistance
}

export default getDistanceInKm
