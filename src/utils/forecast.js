const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const APIkey; // please message me for API keys
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=' + APIkey + '&units=metric';

    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to weather services', undefined)
        } else if (response.body.error) {
            callback('Unable to find forecast for that location. Please retry.', undefined);
        } else {
            const windSpeed = 3.6 * parseInt(response.body.wind.speed);
            callback(undefined, response.body.weather[0].description);
        }
    })
}

module.exports = forecast;
