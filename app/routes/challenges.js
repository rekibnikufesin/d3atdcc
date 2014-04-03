'use strict';

// Challenges routes use challenges controller
var challenges = require('../controllers/challenges');
var authorization = require('./middlewares/authorization');

// Challenge authorization helpers
var hasAuthorization = function(req, res, next) {
	if (req.challenge.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/challenges', challenges.all);
    app.post('/challenges', authorization.requiresLogin, challenges.create);
    app.get('/challenges/:challengeId', challenges.show);
    app.put('/challenges/:challengeId', authorization.requiresLogin, hasAuthorization, challenges.update);
    app.del('/challenges/:challengeId', authorization.requiresLogin, hasAuthorization, challenges.destroy);

    // Finish with setting up the challengeId param
    app.param('challengeId', challenges.challenge);

};