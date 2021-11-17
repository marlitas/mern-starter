'use strict'

const Router = require('express'); 
//import { Router } from 'express';
const bodyParser = require('body-parser');
//import bodyParser from 'body-parser';

const basicAuth = require('express-basic-auth')
//import basicAuth from '../lib/basic-auth-middleware.js';
const User = require('../models/user.js');
//import User from '../model/user.js';

const authRouter = module.exports = new Router();

authRouter.post('/api/signup', bodyParser, (req, res, next) => {
    console.log('hit /api/signup')

    User.create(req.body)
    .then(token => res.send(token))
    .catch(next)
});

authRouter.get('/api/login', basicAuth, (req, res, next) => {
    console.log('hit /api/login')
    req.user.tokenCreate()
    .then(token => res.send(token))
    .catch(next)
});