'use strict';

/**
* Module dependencies
*/
var https = require('https');


/**
* Get FB posts
**/

exports.getFB = function(req) {
	//console.log(JSON.stringify(req.user));
	var options = {
		host: 'graph.facebook.com',
		port: 443,
		path: '/439706722792479/feed?access_token=' + req.user.accessToken,
		method: 'GET'
	};

	// buffer to hold retrieved data
	var buffer = '';

	// initialize the get request
	var request = https.get(options, function(result) {
		result.setEncoding('utf8');
		result.on('data', function(chunk){
			buffer += chunk;
		});
		result.on('end', function(){
			//callback(buffer);
			console.log(buffer);
		});
	});

	// on error
	request.on('error', function(e){
		console.log('error from facebook.get: ' + e.message);
	});

};