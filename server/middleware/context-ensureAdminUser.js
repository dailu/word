var loopback = require('loopback');


module.exports = function () {
	return function ensureAdminUser(req, res, next) {
		var reqContext = req.getCurrentContext();
		var roles = reqContext.get('currentUserRoles');
        reqContext.set('isSuperUser','true');
        return next();
	};
};