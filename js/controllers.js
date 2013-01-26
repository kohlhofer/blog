//-----------------------------------------------------------



function postsController($scope,$routeParams,$http) {

  

  $http.get('/posts.json').then(function(res){
      $scope.posts = res.data;
      if ($routeParams.postId) {
        for (var i = 0; i < $scope.posts.length; i++) {
          if ($scope.posts[i].id == $routeParams.postId) {
            $scope.singlePost = $scope.posts[i];
          }
        }
      }                
    });

  

  $scope.searchString = "";
  
  if ($routeParams.currentTopic) {
    $scope.currentTopic = $routeParams.currentTopic;
  } else {
    $scope.currentTopic = "";
  }

  $scope.topics = {
    "worldview":{
      label:"World View",
      description:""
    },
    "work":{
      label:"Work",
      description:""
    },
    "family":{
      label:"Family & Life",
      description:""
    },
    "inspiration":{
      label:"Inspiration",
      description:""
    },
    "humour":{
      label:"Humour",
      description:"That which amuses me."
    },
    "remarkable":{
      label:"Remarkable Things",
      description:"That which amuses me."
    },
    "other":{
      label:"The Rest",
      description:"That which does not fit in."
    }
  };

  $scope.postCount = function (topic) {
    if (!topic) {
      return $scope.posts.length;
    } else {
      var result = 0;
      for (var i = 0; i < $scope.posts.length; i++) {
        if ($scope.posts[i].topic == topic) {
          result++
        }
      }

      return result;
    }
  }

}



//-----------------------------------------------------------




