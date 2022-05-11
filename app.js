/*============================================================== 
    Can be used to allow switching between different databases       
==============================================================*/
/*
global.DB = {
    PG: 1,
    MSSQL: 2,
    MYSQL: 3,
    MONGODB: 4
};
Object.freeze(global.DB);
global.DATABASE = global.DB.PG; // Define which database to use
*/
//==============================================================

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/productsRoutes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/products', productsRouter);

module.exports = app;