//-----------------------------------------------------------



function postsController($scope,$routeParams,$http,$location,postService) {

  var markDownConverter = new Showdown.converter();

  $scope.host = $location.host();

  $scope.convertMarkDown = function(source) {
    return markDownConverter.makeHtml(source);
  }


  //initialize search string aka filter
  $scope.searchString = "";


  $scope.loadPostContent = function (postId) {
    $http.get('/posts/'+postId+'.txt').then(function(res){
      for (var i = 0; i < $scope.posts.length; i++) {
        if ($scope.posts[i].id == postId) {
          $scope.posts[i].postContent = $scope.convertMarkDown(res.data); 
        }
      }       
    });
  }

  //prepares a single Post IF one is requested as per URL
  $scope.loadSinglePost = function () {
    if ($routeParams.postId) {
      for (var i = 0; i < $scope.posts.length; i++) {
        if ($scope.posts[i].id == $routeParams.postId) {
          //loads the post content if not previously loaded
          if (!$scope.posts[i].postContent) {
            $scope.loadPostContent($routeParams.postId);
          }
          $scope.post = $scope.posts[i]; 
        }
      }
    }
  }

  //gets the post from the service
  $scope.posts = postService.loadPosts();
  

  // check if posts have previously been loaded and get them if not
  if (!$scope.posts) {
    $http.get('/posts.json').then(function(res){
      $scope.posts = res.data;
      postService.storePosts($scope.posts);
      $scope.loadSinglePost();
    });
  } else {
    $scope.loadSinglePost();
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
  
 
  
  if ($routeParams.currentTopic) {
    $scope.currentTopic = $routeParams.currentTopic;
  } else {
    $scope.currentTopic = "";
  }

  $scope.selectTopic = function (topic) {
    $scope.currentTopic = topic;
    if (topic != "") {
      $location.url('topic/'+topic);
    } else {
      $location.url('/');
    }
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
    "reflection":{
      label:"Reflecting",
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




