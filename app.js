/*jslint node: true */
"use strict";

var express = require('express'),
    path    = require('path'),
    index   = require('./routes/index'),
    tweets  = require('./routes/tweets'),
    app     = express(),
    port    = process.env.PORT || 3002;

app.use(express.static(__dirname + '/public', {maxAge: 86400000}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', index);
app.use('/tweets', tweets);

app.listen(port);
console.log('Your server goes on localhost:' + port);