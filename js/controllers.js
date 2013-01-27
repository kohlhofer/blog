//-----------------------------------------------------------



function postsController($scope,$routeParams,$http,$location) {

  var converter = new Showdown.converter();

  $scope.convertMarkDown = function(source) {
    return converter.makeHtml(source);
  }

  $http.get('/posts.json').then(function(res){
      $scope.posts = res.data;
    });

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
      for (var i = 0; i < $scope.posts.length; i++) {
        if ($scope.posts[i].id == postId) {
          $scope.posts[i].postContent = $scope.convertMarkDown(res.data); 
        }
      }        
    });
  }

  $scope.randomColor = function () {
      // colors
      var colors = [
        '#5E412F',
        '#F9CC36',
        '#78C0A8',
        '#F07818',
        '#F0A830',
        '#C7E0D0',
      ];
      return colors[Math.floor(Math.random()*colors.length)];
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
      label:"Working & Learning",
      description:""
    },
    "inspiration":{
      label:"Inspiration",
      description:""
    },
    "humour":{
      label:"The Funnies",
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




