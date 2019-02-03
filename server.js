const express = require('express');
const hbs = require('hbs');
const fs = require('fs');



var app = express();

hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear())
app.set('view engine', 'hbs');

hbs.registerHelper('screamIt', (text) => text.toUpperCase())

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} ${req.method} ${req.url} `
    console.log(log)
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) console.log('Unable to append to server.log')
    })
    next();
})


// app.use((req, res, next) => res.render('base.hbs', { pageTitle: 'Maintenance', description: 'Site is under mainteinence' });

app.get('/', (req, res) => {
    // res.send('<h1>Hello  Express !!</h1>')
    res.render('base.hbs', {
        pageTitle: 'Home Page',
        description: 'Some Text Here'
    })
})

app.get('/about', (req, res) => {
    res.render('base.hbs', {
        pageTitle: 'About Page',
        description: 'Some Text Here'
    })
})

app.get('/*', (req, res) => {
    res.send({
        errorMessage: 'Unable to Handle request'
    })
})

app.use(express.static(__dirname + '/public'));



app.listen(3000, () => {
    console.log('Server is up on port: 3000')
})