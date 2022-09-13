import { cosoleReader } from "./helpers/consoleHelper.js";
import { printError, printHelp, printSucces, printForecast } from "./services/log.service.js";
import { saveValue } from "./services/storage.service.js";
import { getWeather, getIconCode } from "./services/api.service.js";


const saveToken = async (token) => {
    try {
        await saveValue("token", token)
        printSucces('Токен успішно збережений')
    } catch (error) {
        printError("Виникла помилка при збереженні токена")
    }
};

const saveCity = async (city) => {
    try {
        await saveValue("city", city)
        printSucces('Назва міста успішно збережена')
    } catch (error) {
        printError("Виникла помилка при збереженні назви міста")
    }
};

const getForecast = async () => {
    try{
        const forecast = await getWeather();
        printForecast(forecast, getIconCode(forecast.weather[0].icon))
    } catch (e) {
        if(e?.response?.status == 401) {
            printError('Невірно вказаний токен')
        } else if (e.message == 404){
            printError('Невірно вказана назва міста')
        } else {
            printError(e.message)
        }
    }
};

const startCli = () => {
    const setings = cosoleReader(process.argv);
    if(setings.t){
       return saveToken(setings.t);
    }
    if(setings.h) {
        return printHelp();
    }
    if(setings.s) {
        return saveCity(setings.s);
    }
    return getForecast();
    
}   

startCli();