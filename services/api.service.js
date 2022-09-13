import axios from "axios";

import { getKey, getCity } from "./storage.service.js";


export const getIconCode = (icon) => {
    switch (icon) {
        case '01d' :
            return 'sunny';
        case '01n' : 
            return 'new_moon';
        case '02d' :
            return 'barely_sunny';
        case '02n' :
            return 'new_moon';
        case '03d' :
            return 'cloud';
        case '03n' :
            return 'cloud';
        case '04d' :
            return 'cloud';
        case '04n' :
            return 'cloud';
        case '09d' :
            return 'rain_cloud';
        case '09n' :
            return 'rain_cloud';
        case '10d' :
            return 'sun_behind_rain_cloud';
        case '10n' :
            return 'sun_behind_rain_cloud';
        case '11d' :
            return 'thunder_cloud_and_rain';
        case '11n' :
            return 'thunder_cloud_and_rain';
        case '13d' :
            return 'snowflake';
        case '13n' :
            return 'snowflake';
        case '50d' :
            return 'fog';
        case '50n' :
            return 'fog';
    }   
}

export const getWeather = async () => {
    const token = await getKey();
    const city = await getCity();
    const coord = await axios({
        method: 'get',
        url: 'http://api.openweathermap.org/geo/1.0/direct?',
        params: {
            q: city,
            appid: token,
            limit:5
        }
    });

    if (coord.data.length == 0 ) {
        throw new Error(404)
    } else {
        const {data} = await axios('https://api.openweathermap.org/data/2.5/weather?', {
            params: {
                lat : coord.data[0].lat,
                lon: coord.data[0].lon,
                appid: token,
                units: 'metric',
                lang: 'uk'
            }
        });
        return data;
    }

    
}