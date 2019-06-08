import React from 'react';

export default function getGraphic(weatherData, scale, datAarrayName, arrayPropName) {
    return new Promise(resolve => {

      const graphicArray = [];

          if (weatherData) {
            for (let ind = 0; ind < (weatherData[datAarrayName].length - 1) * 2; ind++) {
              if (!weatherData[datAarrayName][ind]) { break; }

              if (scale === 'celcius') {
                graphicArray.push(+(weatherData[datAarrayName][ind][arrayPropName[0]] - 273.1).toFixed(1));
                graphicArray.push(+(weatherData[datAarrayName][ind][arrayPropName[1]] - 273.1).toFixed(1));

              } else if (scale === 'humidity') {
                graphicArray.push(+(weatherData[datAarrayName][ind][arrayPropName[0]]));
                graphicArray.push(+(weatherData[datAarrayName][ind][arrayPropName[1]]));
              }
            }
          }
 
      resolve(graphicArray);
    });
  }
