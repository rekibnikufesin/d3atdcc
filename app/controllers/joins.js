'use strict';

/** 
* Module dependencies
**/
var mongoose = require('mongoose'),
	Join = mongoose.model('Join'),
	_ = require('lodash');


/**
* Find challenges by user id
**/
exports.join = function(req, res, next, id){
	Join.load(id, function(err, join){
		if (err) return next(err);
		if (!join) return next(new Error('Failed to load join ' + id));
		req.join = join;
		next();
	});
};

/**
* Join a Challenge 
**/
exports.create = function(req, res){
	var join = new Join(req.body);
	join.user = req.user;

	join.save(function(err) {
		if (err) {
			return res.send('users/signup', {
				errors: err.errors,
				join: join
			});
		} else {
			res.jsonp(join);
		}
	});
};

/**
* Update a join
**/
exports.update = function(req, res) {
	var join = req.joins;

	join = _.extend(join, req.body);

	join.save(function(err) {
		if (err) {
			return res.send('users/signup', {
				errors: err.errors,
				join: join
			});
		} else {
			res.jsonp(join);
		}
	});
};

/**
* Leave a challenge
**/
exports.destroy = function(req, res){
	var join = req.join;

	join.remove(function(err) {
		if (err) {
			return res.send('users/signup', {
				errors:err.errors,
				join: join
			});
		} else {
			res.jsonp(join);
		}
	});
};

/**
* Show joins
**/
exports.show = function(req, res){
	res.jsonp(req.join);
};

/**
* List of Challenges joined
**/
exports.all = function(req, res){
	Join.find().sort('-created').populate('user', 'name username').exec(function(err, joins){
		if(err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(joins);
		}
	});
};