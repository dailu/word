'use strict';
var admin = require('digitopia-admin');
var getCurrentUser = require('../middleware/context-currentUser');
var ensureAdminUser = require('../middleware/context-ensureAdminUser');

module.exports = function enableAuthentication(server) {
  // enable authentication
  server.enableAuth();
  var userAuth = [getCurrentUser(), ensureAdminUser()];
		var options = {
			
		};
		admin.adminBoot(server, userAuth, 'Customer', ['Customer','Survey','Issue','Bike','BikeUsage','RideRoute','BikeIssue','BikeSurvey'], options);
};
