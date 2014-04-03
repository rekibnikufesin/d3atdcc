'use strict';

// Journals routes use journals controller
var journals = require('../controllers/journals');
var authorization = require('./middlewares/authorization');

// Journal authorization helpers
var hasAuthorization = function(req, res, next) {
	if (req.journal.user.id !== req.user.id) {
		return res.send(401, 'User is not authorized');
	}
	next();
};

module.exports = function(app) {

	app.get('/journals', journals.all);
	app.post('/journals', authorization.requiresLogin, journals.create);
	app.get('/journals/ppu', authorization.requiresLogin, journals.ppu);
	app.get('/journals/:journalId', journals.show);
	app.put('/journals/:journalId', authorization.requiresLogin, hasAuthorization, journals.update);
	app.del('/journals/:journalId', authorization.requiresLogin, hasAuthorization, journals.destroy);

	// Finish with setting up the journalId param
	app.param('journalId', journals.journal);
};