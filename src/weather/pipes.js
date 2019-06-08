import React from 'react';

export function convertScale(scale, value, addChar = true, fixed = 0) {
    switch (scale) {
        case 'celcius':
                return addChar ?
                (<span>{value && (value - 273.1).toFixed(fixed)}&#8451;</span>)
                :
                (<span>{value && (value - 273.1).toFixed(fixed)}</span>)

        default: console.warn('convertScale invalid arguments')
            break;
    }
}

export function dateAM(value, args) {
    const date = new Date(value)
    return date.getHours() + ":" + date.getMinutes() + "" + date.getSeconds()
  }

export function convertPipeMKm(value, convertType = 'm-to-km') {

    switch (convertType) {
      case 'm-to-km': return (+value / 1000).toFixed(1) + 'km';
      case 'km-to-m': return (+value * 1000).toFixed(1) + 'm';

      default:
        break;
    }
}

export function dateConvert(arg, value) {

    switch (arg) {
        case 'day':
            const day = new Date(value)
            const weekday = new Array(7);
            weekday[0] = "Sunday";
            weekday[1] = "Monday";
            weekday[2] = "Tuesday";
            weekday[3] = "Wednesday";
            weekday[4] = "Thursday";
            weekday[5] = "Friday";
            weekday[6] = "Saturday";
            return (<span>{ weekday[day.getDay()]}</span>)
        default:
            break;
    }


}