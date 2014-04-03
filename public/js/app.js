'use strict';

angular.module('mean', ['ngCookies', 'ngResource', 'ngRoute', 'ui.bootstrap', 'ui.route', 'mean.system', 'mean.articles', 'mean.challenges', 'mean.joins', 'mean.journals', 'mean.reports']);

angular.module('mean.system', []);
angular.module('mean.articles', []);
angular.module('mean.challenges', []);
angular.module('mean.joins', []);
angular.module('mean.journals', []);
angular.module('mean.reports', ['d3']);