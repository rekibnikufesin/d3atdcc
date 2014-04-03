'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        'title': 'Articles',
        'link': 'articles'
    }, {
        'title': 'Create New Article',
        'link': 'articles/create'
    }, {
        'title': 'Challenges',
        'link': 'challenges'
    }, {
        'title': 'Create New Challenge',
        'link': 'challenges/create'
    }];
    
    $scope.isCollapsed = false;
}]);