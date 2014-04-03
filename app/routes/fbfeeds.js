'use strict';

// FBFeeds routes use fbfeeds controller
var fbfeeds = require('../controllers/fbfeeds');

module.exports = function(app) {
	app.get('/fbfeeds', fbfeeds.getFB);
};