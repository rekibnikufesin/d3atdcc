'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Challenge = mongoose.model('Challenge'),
    _ = require('lodash');


/**
* Find challenge by id
**/
exports.challenge = function(req, res, next, id){
	Challenge.load(id, function(err, challenge){
		if (err) return next(err);
		if (!challenge) return next(new Error('Failed to load challenge' + id));
		req.challenge = challenge;
		next();
	});
};

/**
* Create a challenge
**/
exports.create = function(req, res){
	var challenge = new Challenge(req.body);
	challenge.user = req.user;

	challenge.save(function(err) {
		if (err) {
			return res.send('users/signup', {
				errors: err.errors,
				challenge: challenge
			});
		} else {
			res.jsonp(challenge);
		}
	});
};

/**
* Update a challenge
**/
exports.update = function(req, res){
	var challenge = req.challenge;

	challenge = _.extend(challenge, req.body);

	challenge.save(function(err) {
		if (err) {
			return res.send('users/signup', {
				errors: err.errors,
				challenge: challenge
			});
		} else {
			res.jsonp(challenge);
		}
	});
};

/**
* Delete a challenge
**/
exports.destroy = function(req, res){
	var challenge = req.challenge;

	challenge.remove(function(err) {
		if (err) {
			return res.send('users/signup', {
				errors: err.errors,
				challenge: challenge
			});
		} else {
			res.jsonp(challenge);
		}
	});
};

/**
* Show a challenge
**/
exports.show = function(req, res){
	res.jsonp(req.challenge);
};

/**
* List of Challenges
**/
exports.all = function(req, res){
	Challenge.find().sort('-created').populate('user', 'name username').exec(function(err, challenges) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(challenges);
		}
	});
};
