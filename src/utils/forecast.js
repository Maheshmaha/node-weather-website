const request = require('request');


const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/3621242b1f8c3a5d784cb349f8cd1327/' + latitude + ','+ longitude + '?units=si&lang=es';
    request({url, json:true}, (error, {body}) => {
        if(error) {
            callback("Unable to connect to weather service", undefined);
        } else if(body.error) {
            callback("Unable to find the location", undefined);
        } else {
            callback(undefined, body.daily.data[0].summary + " It is currently " + body.currently.temperature + " degrees out. There is a " + body.currently.precipProbability + "% chance of rain. The maximum tempaerature is " + body.daily.data[0].temperatureMax + " , The minimum temperature is " + body.daily.data[0].temperatureMin);
        }
    });
}

module.exports = forecast;


// request({url:url, json:true}, (error, response) => {
//     if(error) {
//         console.log("Unable to connect to weather service");
//     } else if (response.body.error) {
//         console.log("Unable to find the location");
//     } else {
//         console.log(response.body.daily.data[0].summary + " It is currently " + response.body.currently.temperature + " degrees out. There is a " + response.body.currently.precipProbability + "% chance of rain.");
//     }
//     // console.log(response.body.currently);
    
// })
