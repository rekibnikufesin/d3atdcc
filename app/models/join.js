'use strict';

/** 
* Module dependencies
**/
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
* Join Schema
* Used to identify challenges user belongs to
**/
var JoinSchema = new Schema({
	created_time: {
		type: Date,
		default: Date.now
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

mongoose.model('Join', JoinSchema);