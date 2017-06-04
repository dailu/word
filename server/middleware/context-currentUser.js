var loopback = require('loopback');

module.exports = function () {
	return function contextCurrentUser(req, res, next) {
			return next();
	
	};
};