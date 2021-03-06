'use strict';


// Declare app level module which depends on filters, and services
angular.module('blogApp', ['blogApp.directives','blogApp.services']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/index.html', controller: 'postsController'});
    $routeProvider.when('/topic/:currentTopic', {templateUrl: 'partials/index.html', controller: 'postsController'});
    $routeProvider.when('/post/:postId', {templateUrl: 'partials/post.html', controller: 'postsController'});
    $routeProvider.when('/about', {templateUrl: 'partials/about.html', controller: 'staticController'});
    $routeProvider.when('/contact', {templateUrl: 'partials/contact.html', controller: 'staticController'});
    $routeProvider.otherwise({redirectTo:'/'});
  }]);