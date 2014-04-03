'use strict';

/**
* Module dependencies.
*/
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
* Comment Schema
**/
var CommentSchema = new Schema({
	id: {
		type: String
	},
	from: {
		name: { type: String},
		id: { type: String}
	},
	message: {
		type: String
	},
	like_count: {
		type: Number
	}
});

/**
* Likes Schema
*/
var LikesSchema = new Schema({
	id: {
		type: String
	},
	name: {
		type: String
	}
});

/**
* Journal Schema
**/

var JournalSchema = new Schema({
	created_time: {
		type: Date,
		default: Date.now
	},
	updated_time: {
		type: Date,
		default: Date.now
	},
	message: {
		type: String
	},
	comments: {
		data: [CommentSchema]
	},
	likes: {
		data: [LikesSchema]
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	challenge: {
		type: Schema.ObjectId,
		ref: 'Challenge'
	}
});

/**
* Statics
**/
JournalSchema.statics.load = function(id, cb) {
	this.findOne({
		_id: id
	}).populate('user', 'name username').exec(cb);
};

mongoose.model('Journal', JournalSchema);