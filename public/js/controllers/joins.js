'use strict';

angular.module('mean.joins').controller('JoinsController', ['$scope', '$routeParams', '$location', 'Global', 'Joins', function ($scope, $routeParams, $location, Global, Joins) {
	$scope.global = Global;
	$scope.challengeId = $routeParams.challengeId;

	$scope.create = function() {
		var join = new Joins({
			challenge: $routeParams.challengeId
		});
		join.$save(function(response) {
			$location.path('/' + response._id);
		});
	};

	$scope.remove = function(join) {
		if (join) {
			join.$remove();

			for (var i in $scope.joins) {
				if ($scope.joins[i] === join) {
					$scope.joins.splice(i, 1);
				}
			}
		} else {
			$scope.join.$remove();
			$location.path('joins');
		}
	};

	$scope.find = function() {
		Joins.query(function(joins) {
			$scope.joins = joins;
		});
	};

	$scope.findOne = function() {
		Joins.get({
			joinId: $routeParams.routeId
		}, function(join) {
			$scope.join = join;
		});
	};
}]);