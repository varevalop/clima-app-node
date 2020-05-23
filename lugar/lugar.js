const axios = require("axios");

const getLugarLatLng = async(direccion) => {
    const encodeURL = encodeURI(direccion) // para caracteres especiales
    const instancia = axios.create({
        baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${encodeURL}`,
        timeout: 1000,
        headers: { "x-rapidapi-key": "aa2006f03bmshf51ac4f2e0e28e0p1eaf86jsnb587c255ae23" }
    });

    const resp = await instancia.get();

    if (resp.data.Results.length === 0) {
        throw new Error(`No hay resultados para ${direccion}`);
    }

    const data = resp.data.Results[0];
    const dir = data.name;
    const lat = data.lat;
    const lng = data.lon;

    return {
        dir,
        lat,
        lng
    }
}

module.exports = {
    getLugarLatLng
}