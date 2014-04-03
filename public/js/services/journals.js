'use strict';

//Journals service used for journals REST endpoint
angular.module('mean.journals').factory('Journals', ['$resource', function($resource) {
	return $resource('journals/:journalId', {
		journalId: '@_id'
	}, {
		update: {
			method: 'PUT'
		}
	});
}]);