require('express-async-errors');
const express = require('express');
const filterErrors = require('../errors/ErrorController');
const productRoute = require('../routes/ProductsRoute');
const userRoute = require('../routes/UserRoute');

const app = express();
app.use(express.json());

app.use('/products', productRoute);
app.use('/', userRoute);

app.use(filterErrors);

module.exports = app;
