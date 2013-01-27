//-----------------------------------------------------------



function postsController($scope,$routeParams,posts,$http,$location) {

  var converter = new Showdown.converter();

  $scope.convertMarkDown = function(source) {
    return converter.makeHtml(source);
  }

  $scope.posts = posts.getAll();

  if ($routeParams.postId) {
    /*
    for (var i = 0; i < $scope.posts.posts.length; i++) {
      if ($scope.posts.posts[i].id == $routeParams.postId) {
        $scope.singlePost = $scope.posts.posts[i];
      }
    }
    */
  }

  $scope.loadPostContent = function (postId) {
    $http.get('/posts/'+postId+'.txt').then(function(res){
      for (var i = 0; i < $scope.posts.posts.length; i++) {
        if ($scope.posts.posts[i].id == postId) {
          $scope.posts.posts[i].postContent = $scope.convertMarkDown(res.data); 
        }
      }        
    });
  }
  
  $scope.searchString = "";
  
  if ($routeParams.currentTopic) {
    $scope.currentTopic = $routeParams.currentTopic;
  } else {
    $scope.currentTopic = "";
  }

  $scope.selectTopic = function (topic) {
    $scope.currentTopic = topic;
    //$location.url('test');
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
      return $scope.posts.posts.length;
    } else {
      var result = 0;
      for (var i = 0; i < $scope.posts.posts.length; i++) {
        if ($scope.posts.posts[i].topic == topic) {
          result++
        }
      }
      return result;
    }
  }

}



//-----------------------------------------------------------




