'use strict';

/* Services */


//This Service provides game objects
var servicesModule = angular.module('blogApp.services', []);


// This is currently not used (using http from the controller directly since it does not require a specially formated responses)
servicesModule.factory('postsRestBackend', function($resource){
  return $resource('/posts.json', {alt:'json', callback:'JSON_CALLBACK'}, {
    getAll: {method:'JSONP'}
  });
});

servicesModule.factory('postService', function() {
  var servicePosts = [];
  return {
    storePosts : function(posts) {
      servicePosts = posts;
      return servicePosts;
    },
    loadPosts : function() {
      if (servicePosts != "") {
        return servicePosts;
      } else {
        return false;
      }
    }
  }
});
