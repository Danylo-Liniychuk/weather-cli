import { homedir } from 'os';
import { join } from 'path';
import { promises } from 'fs';


const filePath = join(homedir(), 'weather-data.json');



export const saveValue = async (key, value) => {
    let data = {};
    if ( await isExist(filePath)) {
        const file = await promises.readFile(filePath);
        data = JSON.parse(file);
    };
    data[key] = value;
    await promises.writeFile(filePath, JSON.stringify(data));
};

export const getKey = async () => {
    if ( await isExist(filePath)) {
        let key = await promises.readFile(filePath);
        key = JSON.parse(key);
        return key.token;
    } else { 
        throw new Error("Не знайдений токен спробуйте -t [TOKEN_VALUE]")
    };
}
export const getCity = async () => {
    if ( await isExist(filePath)) {
        let key = await promises.readFile(filePath);
        key = JSON.parse(key);
        if(!key.city) {
            throw new Error("Назва міста не задана спробуйте -s [CITY_NAME]")
        } else {
            return key.city
        }
        
    };
}

const isExist = async (path) => {
    try {
        await promises.stat(path);
        return true;
    } catch (e){
        return false;
    }
}