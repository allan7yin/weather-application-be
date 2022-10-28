// internals
const path = require('path'); // this is a built in Node module that makes it a lot easier to manipulate and work with paths 
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

// DYNAMIC 
app.get('', (req, res) => {

})

app.get('/about', (req, res) => {

})

app.get('/help', (req, res) => {
})


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

// TO SETUP A 404 PAGE (NEEDS TO COME LAST)a

app.get('*', (req, res) => { // the * means matching anything 
})

// we user 3000 here, which is fine for local development. However, if we want to push to Heroku, need to use a port they provide us with. 
app.listen(port, () => {
    console.log('Server is up on the port ' + port + '.');
});
