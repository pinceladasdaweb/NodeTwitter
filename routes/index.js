/*jslint node: true */
"use strict";

var express = require('express'),
    router  = express.Router();

router.get('/', function (req, res) {
    res.render('index', { title: 'Nodejs and Twitter API' });
});

module.exports = router;