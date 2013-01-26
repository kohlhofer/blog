'use strict';


// Declare app level module which depends on filters, and services
angular.module('blogApp', ['blogApp.directives']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/index.html', controller: 'postsController'});
    $routeProvider.when('/by-topic/:currentTopic', {templateUrl: 'partials/index.html', controller: 'postsController'});
    $routeProvider.when('/post/:postId', {templateUrl: 'partials/post.html', controller: 'postsController'});
    $routeProvider.otherwise({redirectTo:'/'});
  }]);