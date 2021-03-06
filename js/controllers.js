//-----------------------------------------------------------


function staticController($scope,$routeParams,$location) {

}

function navigationController($scope,$location) {



  $scope.randomPattern = function () {

    var patterns = [
        'chruch.png',
        'cream_dust.png',
        'diagonal_striped_brick.png',
        'diamond_upholstery.png',
        'foggy_birds.png',
        'norwegian_rose.png',
        'pinstripe.png',
        'shattered.png',
        'subtle_stripes.png',
        'whitediamond.png'
      ];

    $('body').css('background-image', 'url(img/patterns/' + patterns[Math.floor(Math.random()*patterns.length)] + ')');
  }


  $scope.currentSection = function (section) {
    var locationPath = $location.path();
    if (locationPath.indexOf(section) != -1) {
      return 'active';
    } else if (section == 'blog') {
      if (locationPath.indexOf('topic') != -1 || locationPath == '/'  ) {
        return 'active';
      } else {
        return false;
      }
    } else {
      return false;
    }
  }


  $scope.randomPattern();




}


function postsController($scope,$routeParams,$http,$location,postService) {

  var windowWidth = $(window).width();

  $scope.topics = {
    "worldview":{
      sortOrder:2,
      label:"World View",
      color:"#39E",
      description:""
    },
    "work":{
      sortOrder:3,
      label:"Working & Learning",
      color:"#39E",
      description:""
    },
    "inspiration":{
      sortOrder:4,
      label:"Inspiration",
      color:"#39E",
      description:""
    },
    "humour":{
      sortOrder:5,
      label:"The Funnies",
      color:"#39E",
      description:"That which amuses me."
    },
    "remarkable":{
      sortOrder:1,
      label:"Remarkable Things",
      color:"#39E",
      description:"That which amuses me."
    },
    "other":{
      sortOrder:6,
      label:"The Rest",
      color:"#39E",
      description:"That which does not fit in."
    }
  };


  $scope.goBack = function () {
    window.history.back()
  }

  $scope.bootstrapAffix = function () {
    //makes navigation sticky if screen is large enough (same as bootstrap threshold)
    if (windowWidth > 767) {
      $('#topBar').affix({offset:160});
      $('#sideNav').affix({offset:160});
    }
  }

  $scope.bootstrapAffix();

  var markDownConverter = new Showdown.converter();

  $scope.host = $location.host();

  $scope.convertMarkDown = function(source) {
    return markDownConverter.makeHtml(source);
  }


  //initialize search string aka filter
  $scope.searchString = "";


  $scope.loadPostContent = function (postId) {
    $http.get('posts/'+postId+'.txt').then(function(res){
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
    $http.get('posts.json').then(function(res){
      $scope.posts = res.data;
      postService.storePosts($scope.posts);
      $scope.loadSinglePost();
    });
  } else {
    $scope.loadSinglePost();
  }



  $scope.selectColor = function (id) {
      // colors
      var colors = [
        '#5E412F',
        '#F9CC36',
        '#78C0A8',
        '#F07818',
        '#F0A830',
        '#C7E0D0',
      ];

      if (id == 'random') {
        return colors[Math.floor(Math.random()*colors.length)];
      } else {
        return colors[id];
      }
  }
  
 
  
  if ($routeParams.currentTopic) {
    $scope.currentTopic = $routeParams.currentTopic;
    $scope.searchLabel = 'Search in ' + $scope.topics[$scope.currentTopic].label;
  } else {
    $scope.currentTopic = "";
    $scope.searchLabel = 'Search ...';
  }

  $scope.selectTopic = function (topic) {
    $scope.currentTopic = topic;
    if (topic != "") {
      $location.url('topic/'+topic);
    } else {
      $location.url('/');
    }
  }



  $scope.openPermanentUrl = function (id) {
    $location.url('post/'+id);
  }

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




