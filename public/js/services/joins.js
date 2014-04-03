'use strict';

//Joins service used for the joins REST endpoint
angular.module('mean.joins').factory('Joins', ['$resource', function($resource) {
	return $resource('joins/:joinId', {
		joinId: '@_id'
	}, {
		update: {
			method: 'PUT'
		}
	});
}]);