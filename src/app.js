// internals
const path = require('path'); 
const express = require('express');

var cors = require('cors')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast.js');


const app = express(); 
const port = process.env.PORT || 8080;

// DEFINE PATHS BELOW

const viewsPath =  path.join(__dirname, '../templates/views');
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(cors())

app.set('views', viewsPath);
app.use(express.static(publicDirectoryPath)); 

app.get('/weather', (req,res) => {
    if (!(req.query.address)) {
        res.json({
            error: 'You must provide an address!'
        })
    } else {
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => { 
            if (error) {
                res.json({error});
            } else {
                forecast(latitude, longitude, (error, forecastData) => {
                    if (error) {
                        res.json({error});
                    } else {
                        res.json({
                            forecast: forecastData,
                            location,
                            address: req.query.address
                        })
                    }
                })
            }
        })
    }
})

app.get('*', (req, res) => { 
})

app.listen(port, () => {
    console.log('Server is up on the port ' + port + '.');
});
