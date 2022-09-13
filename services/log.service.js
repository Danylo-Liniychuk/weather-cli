import chalk from 'chalk';
import emoji from "node-emoji";

const printError = (error) => {
    console.log(chalk.bgRed(` ERROR `) + ` ${error}`);
}

const printSucces = (message) => {
    console.log(chalk.bgGreen(` SUCCES `) + ` ${message}`)
}

const printHelp = () => {
    console.log(chalk.bgCyan(' HELP \n') + 
`Без параметрів - прогноз погоди
-s [CITY] - введення назви міста
-t [TOKEN] - додавання токена)`
)}

const printForecast = (weather, icon) => {
    console.log(chalk.bgYellow(' WEATHER \n') +
`Погода в місті ${weather.name}
${emoji.get(icon)}  ${weather.weather[0].description}
Температура: ${weather.main.temp}° (відчувається як ${weather.main.feels_like}°)
Вологість: ${weather.main.humidity}%
Швидкість вітру: ${weather.wind.speed} м/c`)
}

export {printError, printHelp, printSucces, printForecast};