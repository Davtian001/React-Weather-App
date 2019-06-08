import axios from 'axios';


const WEATHER_URL = 'http://api.openweathermap.org/data/2.5/forecast?q=';
const API_KEY = 'c43bfb8f4335efe4e1714dd01126b645';
const IMG_URL = 'http://openweathermap.org/img/w';


export default class WeatherService {

    async privateGetWeather(url = WEATHER_URL, city = 'Yerevan', apiKey = API_KEY) {
        try {

            const response = await axios.get(`${url}${city}&APPID=${apiKey}`)
            const data = response.data;


            data.list.map(weatherDataItem => {
                const currentIcon = weatherDataItem.weather[0].icon;
                weatherDataItem.weather[0].icon = this.privateDecodeWeatherImg(currentIcon);
                return weatherDataItem;
            })

            return data;
        } catch (error) {
            console.log("WeatherService metod privateGetWeather", error)
        }
    }

    async toDivideWithDays() {

        const weathetData = await this.privateGetWeather()


        let equalDate = new Date(weathetData.list[0].dt_txt).getDate() - 2;
        let weatherDataPieces = [];
        let pushIndex = 0;

        weathetData.list.forEach((item, ind) => {

            if (equalDate === (new Date(item.dt_txt).getDate())) {

                if (weatherDataPieces[pushIndex]) {
                    weatherDataPieces[pushIndex].push(item);

                } else {
                    weatherDataPieces[pushIndex] = [];
                    weatherDataPieces[pushIndex].push(item);
                }

            } else {
                if (ind !== 0) pushIndex++;
                weatherDataPieces[pushIndex] = [];
                weatherDataPieces[pushIndex].push(item);

                equalDate = new Date(item.dt_txt).getDate();
            }
        });
        weathetData.list = weatherDataPieces;
        weatherDataPieces = null; // clean memory

        const midifedData = this.privateGetMaxandMinTempDay(weathetData);
        return midifedData;
    }


    privateGetMaxandMinTempDay(weathetData) {
        let dayMaxTemp = 0;
        let dayMinTemp = Infinity;
        let dayMaxHumidity = 0;
        let dayMinHumidity = Infinity;

        let dayWeatherItemIndex = 0;
        weathetData.dayMaxAndMinTemp = [];
        weathetData.dayMaxAndMinHum = [];

        weathetData.list.forEach((dayWeatherItem, ind) => {
            dayWeatherItemIndex = ind;


            dayWeatherItem.forEach(dataItem => {
                if (dataItem.main.temp > dayMaxTemp) { dayMaxTemp = dataItem.main.temp; }

                if (dayMinTemp > dataItem.main.temp) { dayMinTemp = dataItem.main.temp; }

                if (dataItem.main.humidity > dayMaxHumidity) { dayMaxHumidity = dataItem.main.humidity; }
                if (dayMinHumidity > dataItem.main.humidity) { dayMinHumidity = dataItem.main.humidity; }
            });

            weathetData.dayMaxAndMinTemp.push({ dayMax: dayMaxTemp, dayMin: dayMinTemp });
            weathetData.dayMaxAndMinHum.push({ dayMax: dayMaxHumidity, dayMin: dayMinHumidity })
        });
        return weathetData;
    }


    privateDecodeWeatherImg(imgCode, url = IMG_URL) {
        return `${url}/${imgCode}.png`;
    }
}   


// http://jsraccoon.ru/react-sort-and-search
// https://ru.reactjs.org/docs/faq-functions.html
// https://ru.reactjs.org/docs/context.html