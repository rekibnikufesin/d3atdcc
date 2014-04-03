'use strict';

//Setting up route
angular.module('mean').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/articles', {
            templateUrl: 'views/articles/list.html'
        }).
        when('/articles/create', {
            templateUrl: 'views/articles/create.html'
        }).
        when('/articles/:articleId/edit', {
            templateUrl: 'views/articles/edit.html'
        }).
        when('/articles/:articleId', {
            templateUrl: 'views/articles/view.html'
        }).
        when('/challenges', {
            templateUrl: 'views/challenges/list.html'
        }).
        when('/challenges/create', {
            templateUrl: 'views/challenges/create.html'
        }).
        when('/challenges/:challengeId/edit', {
            templateUrl: 'views/challenges/edit.html'
        }).
        when('/challenges/:challengeId', {
            templateUrl: 'views/challenges/view.html'
        }).
        when('/joins', {
            templateUrl: 'views/joins/list.html'
        }).
        when('/joins/create', {
            templateUrl: 'views/joins/create.html'
        }).
        when('/joins/:joinId/edit', {
            templateUrl: 'views/joins/edit.html'
        }).
        when('/joins/:joinId', {
            templateUrl: 'views/joins/view.html'
        }).
        when('/journals', {
            templateUrl: 'views/journals/list.html'
        }).
        when('/journals/create/:challengeId', {
            templateUrl: 'views/journals/create.html'
        }).
        when('/journals/:journalId/edit', {
            templateUrl: 'views/journals/edit.html'
        }).
        when('/journals/:journalId', {
            templateUrl: 'views/journals/view.html'
        }).
        when('/', {
            templateUrl: 'views/index.html'
        }).
        when('/reports/ppu', {
            templateUrl: 'views/reports/ppu.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);