require('express-async-errors');
const cors = require('cors');
const express = require('express');
const filterErrors = require('../errors/ErrorController');
const productRoute = require('../routes/ProductsRoute');
const userRoute = require('../routes/UserRoute');

const app = express();
app.use(cors());
app.use('/images', express.static('public'));
app.use(express.json());

app.use('/products', productRoute);
app.use('/', userRoute);
app.get('/orders', (_req, res) => res.status(200).send('oi'));

app.use(filterErrors);

module.exports = app;
