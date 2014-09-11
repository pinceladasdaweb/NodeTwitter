/*jslint node: true */
"use strict";

var express = require('express'),
    Twit    = require('twit'),
    config  = require('../config'),
    router  = express.Router();

// Instantiate Twit module
var twitter = new Twit(config.twitter);

// Api endpoint
var userTimeline = '/statuses/user_timeline';

router.get('/', function (req, res) {
    var params = {
        screen_name: req.query.user,
        count: req.query.counter
    };

    twitter.get(userTimeline, params, function (err, data, resp) {
        res.send(data);
    });
});

module.exports = router;