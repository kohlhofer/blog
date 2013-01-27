'use strict';

/* Services */


//This Service provides game objects
var servicesModule = angular.module('blogApp.services', ['ngResource']);

servicesModule.factory('posts', function($resource){
  return $resource('/posts.json', {alt:'json', callback:'JSON_CALLBACK'}, {
    getAll: {method:'JSONP'}
  });
});
