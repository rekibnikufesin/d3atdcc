'use strict';

/**
* Module dependencies
*/
var mongoose = require('mongoose'),
	Journal = mongoose.model('Journal'),
	_ = require('lodash');


/**
* Find journal by id
**/
exports.journal = function(req, res, next, id){
	Journal.load(id, function(err, journal){
		if (err) return next(err);
		if (!journal) return next(new Error('Failed to load journal ' + id));
		req.journal = journal;
		next();
	});
};

/**
* Create a journal entry
*/
exports.create = function(req, res){
	var journal = new Journal(req.body);
	journal.user = req.user;
	journal.challenge = req.user.currentchallenge;

	journal.save(function(err) {
		if (err) {
			return res.send('users/signup', {
				errors: err.errors,
				journal: journal
			});
		} else {
			res.jsonp(journal);
		}
	});
};

/**
* Update Journal
**/
exports.update = function(req, res){
	var journal = req.journal;

	journal = _.extend(journal, req.body);

	journal.save(function(err) {
		if (err) {
			return res.send('users/signup', {
				errors: err.errors,
				journal: journal
			});
		} else {
			res.jsonp(journal);
		}
	});
};

/**
* Delete journal entry
**/
exports.destroy = function(req, res){
	var journal = req.journal;

	journal.remove(function(err) {
		if (err) {
			return res.send('users/signup', {
				errors: err.errors,
				journal: journal
			});
		} else {
			res.jsonp(journal);
		}
	});
};

/**
* Show a Journal
**/
exports.show = function(req, res){
	res.jsonp(req.journal);
};

/**
* List of Journal Entries
**/
exports.all = function(req, res){
	Journal.find( {'challenge': req.user.currentchallenge } ).sort('-created_time').populate('user', 'name username').exec(function(err, journals){
		if(err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(journals);
		}
	});
};

/**
* Posts per user
**/
exports.ppu = function(req, res){
	Journal.aggregate([
		{ $group:
			{ _id: '$from.name', numposts: { $sum: 1} }
		},
		{ $project:
			{ who: '$from.name', numposts: 1 }
		},
		{ $sort:
			{ _id: 1 }
		}
	], function(err, result){
		if(err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(result);
		}
	});
};
