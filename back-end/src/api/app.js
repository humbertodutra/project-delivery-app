const express = require('express');

const app = express();
app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());
app.get('/orders', (_req, res) => res.status(200).send('oi'));

module.exports = app;
