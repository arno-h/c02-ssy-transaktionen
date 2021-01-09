const express = require('express');
const logger = require('morgan');

// Generic application setup
const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Load routes into variables
const index = require('./routes/index');
const invoices = require('./routes/invoices');
const cars = require('./routes/cars');
const coordinator = require('./routes/coordinator');

// Configure routes in Express webserver
app.use('/', index);
app.use('/invoices', invoices);
app.use('/cars', cars);
app.use('/coordinator', coordinator);

module.exports = app;
