'use strict';

angular.module('mean.journals').controller('JournalsController', ['$scope', '$routeParams', '$location', 'Global', 'Journals', function ($scope, $routeParams, $location, Global, Journals) {
	$scope.global = Global;
	$scope.challengeId = $routeParams.challengeId;

	$scope.create = function() {
		var journal = new Journals({
			message: this.message
		});
		journal.$save(function(response) {
			$location.path('/' + response._id);
		});

		this.message = '';
	};

	$scope.remove = function(journal) {
		if (journal) {
			journal.$remove();

			for (var i in $scope.journals) {
				if ($scope.journals[i] === journal) {
					$scope.journals.splice(i, 1);
				}
			}
		} else {
			$scope.journal.$remove();
			$location.path('journals');
		}
	};

	$scope.update = function() {
		var journal = $scope.journal;
		if (!journal.updated) {
			journal.updated = [];
		}
		journal.updated.push(new Date().getTime());

		journal.$update(function() {
			$location.path('journals/' + journal._id);
		});
	};

	$scope.find = function() {
		Journals.query(function(journals) {
			$scope.journals = journals;
		});
	};

	$scope.findOne = function() {
		Journals.get({
			journalId: $routeParams.journalId
		}, function(journal) {
			$scope.journal = journal;
		});
	};
}]);