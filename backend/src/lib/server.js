'use strict'

const cors = require('cors');
//import cors from 'cors';
const express = require('express');
//import express from 'express';
const mongoose = require('mongoose');
//import mongoose from 'mongoose';
const bodyParser = require('body-parser');
//import bodyParser from 'body-parser';

const app = express();
const router = express.Router();

//env variables
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mern-starter';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.use(bodyParser.json(),cors())

app.use(require('../routes/user.routes'));

app.all('*', (request, response) => {
    console.log('Returning a 404 from the catch-all route');
    return response.sendStatus(404);
});

//error middleware
//app.use(require('./error-middleware'));

exports.start = () => {
    app.listen(PORT, () => {
        console.log(`Listening on port: ${PORT}`)
    })
}

exports.stop = () => {
    app.close(PORT, () => {
        console.log(`Shut down on port: ${PORT}`)
    })
}