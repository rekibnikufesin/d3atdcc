'use strict';

angular.module('mean.challenges').controller('ChallengesController',  ['$scope', '$routeParams', '$location', 'Global', 'Challenges', function ($scope, $routeParams, $location, Global, Challenges){
	$scope.global = Global;

	$scope.create = function() {
		var challenge = new Challenges({
			name: this.name,
			notes: this.notes,
			startDate: this.startDate,
			endDate: this.endDate,
			facebookURL: this.facebookURL,
			userFee: this.userFee,
			winnerPayout: this.winnerPayout
		});
		challenge.$save(function(response) {
			$location.path('challenges/' + response._id);
		});
	};

	$scope.remove = function(challenge) {
		if (challenge) {
			challenge.$remove();

			for (var i in $scope.challenges) {
				if ($scope.challenges[i] === challenge) {
					$scope.challenges.splice(i, 1);
				}
			}
		}
		else {
			$scope.challenge.$remove();
			$location.path('challenges');
		}
	};

	$scope.update = function() {
		var challenge = $scope.challenge;
		if (!challenge.updated) {
			challenge.updated = [];
		}
		challenge.updated.push(new Date().getTime());

		challenge.$update( function() {
			$location.path('challenges/' + challenge._id);
		});
	};

	$scope.find = function() {
		Challenges.query(function(challenges) {
			$scope.challenges = challenges;
		});
	};

	$scope.findOne = function() {
		Challenges.get({
			challengeId: $routeParams.challengeId
		}, function(challenge) {
			$scope.challenge = challenge;
		});
	};
}]);