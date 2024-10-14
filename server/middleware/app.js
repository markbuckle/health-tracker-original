const express = require('express');

const app = express();

function middleware1 (req, res, next) {
    req.customProperty = 100;
    next();
}

function middleware2 (req, res, next) {
    console.log(`The custom property value is: ${req.customProperty}`);
    req.customProperty = 600;
    next();
}
function errorHandler(err, req, res, next) {
    res.json({err: err}); // frontend error handler. Comment this out if you want to use the server error handler
    // server error handler
    if (err) {
        res.send('<h1>There was an error, please try again</h1>');
    }
}

// make sure your errorHandler comes after your middleware
app.use(middleware1);
app.use(middleware2);

app.get('/', (req, res, next) => {
    res.send(`<h1>The value is: ${req.customProperty} </h1>`);
})

app.use(errorHandler);

app.listen(3000);