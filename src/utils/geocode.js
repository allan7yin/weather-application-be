const request = require('request');

const geocode = (address, callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=33e8b2426cf20720443d24de143d57ac&query=' + encodeURIComponent(address);
    request({url: url, json: true}, (error, response) => {
        // normally, we would do, if (error), but this API does not return an error if the address does not exist, so we just do data.length == 0
        if (response.body.data.length == 0) {
            callback('Unable to find location. Please try another search.', undefined);
        } else {
            callback(undefined, {
                location: response.body.data[0].label,
                latitude: response.body.data[0].latitude,
                longitude: response.body.data[0].longitude,
            })
        }
    })
}

module.exports = geocode;



