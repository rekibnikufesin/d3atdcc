'use strict';

// Joins routes use joins controller
var joins = require('../controllers/joins');
var authorization = require('./middlewares/authorization');

// Join authorization helpers
var hasAuthorization = function(req, res, next) {
	if (req.join.user.id !== req.user.id) {
		return res.send(401, 'User is not authorized');
	}
	next();
};

module.exports = function(app) {

	app.get('/joins', joins.all);
	app.post('/joins', authorization.requiresLogin, joins.create);
	app.get('/joins/:joinId', joins.show);
	app.put('/joins/:joinId', authorization.requiresLogin, hasAuthorization, joins.update);
	app.del('/joins/:joinId', authorization.requiresLogin, hasAuthorization, joins.destroy);

	// Finish with setting up joinId param
	app.param('joinId', joins.join);
};