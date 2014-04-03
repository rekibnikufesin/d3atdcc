'use strict';

//Challenges service used for challenges REST endpoint
angular.module('mean.challenges').factory('Challenges', ['$resource', function($resource) {
    return $resource('challenges/:challengeId', {
        challengeId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);