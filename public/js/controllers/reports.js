'use strict';

angular.module('mean.reports').controller('ReportsController', ['$scope', '$http', function($scope, $http){
    $http({
      method: 'GET',
      url: '/journals/ppu'
    }).then(function(data, status) {
    	$scope.d3Data = data.data;
    });
}]);