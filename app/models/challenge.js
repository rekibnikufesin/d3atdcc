'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
/**
* Challenge Schema
**/

var endDate = new Date();
endDate.setDate(endDate.getDate() + 30);

var ChallengeSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	name: {
		type: String,
		default: '',
		trim: true
	},
	notes: {
		type: String,
		default: '',
		trim: true
	},
	startDate: {
		type: Date,
		default: Date.now
	},
	endDate: {
		type: Date,
		default: endDate
	},
	facebookURL: {
		type: String,
		default: ''
	},
	userFee: {
		type: Number,
		default: 0
	},
	winnerPayout: {
		type: Number,
		default: 2
	},
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

/**
* Validations
*/
ChallengeSchema.path('name').validate( function(name){
	return name.length;
}, 'Name cannot be blank');

/**
* Statics
**/
ChallengeSchema.statics.load = function(id, cb) {
	this.findOne({
		_id: id
	}).populate('user', 'name username').exec(cb);
};

mongoose.model('Challenge', ChallengeSchema);
