const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

console.log(__dirname);
console.log(__filename);
//the path has got methods to manipulate the path
//it has got join method which is used to maipulate the path
//.. goes down one folder
console.log(path.join(__dirname, '../public'))

//Define paths for Express config
const publicPathDirectory = path.join(__dirname, '../public');
//by default the express expects the views to be in the views directory but we can customize it
const viewPath = path.join(__dirname, '../templates/views');
//below providing path for the hbs partials
const partialsPath = path.join(__dirname, '../templates/partials');

const app = express();

//we are going to use a templating engine called handlebars we installed hbs which is express plugin
//which integrates handlebars
//we need to tell the express which templating engine we are going to use

//Set up handlebars and view location
app.set('view engine', 'hbs');
//here below we have to set the folder that we are going to use as an alternative to views
app.set('views', viewPath);
//now we have to register the partials
hbs.registerPartials(partialsPath);

//the below tell the express to configure serving static files from the public directory
//set up static directory to serve
app.use(express.static(publicPathDirectory));

app.get('', (req,res) => {
    //here we are telling express to use index.hbs from the views
    //we can set dynamic variables
    res.render('index', {
        title: 'Weather App',
        name: 'SpiderMan'
    });
});

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About page',
        name: 'SpiderMan'
    });
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help page',
        message: 'How to navaigate to home page',
        name: 'Spiderman'
    })
})

// app.get('', (req, res) => {
//     res.send('<h1>Hello express</h1>');
// })

// app.get('/help', (req, res) => {
  
// })

// app.get('/about', (req, res) => {
   
// })

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            res.send({
                error: error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                res.send({
                    error: error
                })
            }

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Spiderman'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Spiderman'
    })
})

app.listen('3000', () => {
    console.log("Server is up on port 3000");
})