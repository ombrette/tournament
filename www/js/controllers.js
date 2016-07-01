app.controller('HomeCtrl', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
    $http({
        method : "GET",
        url : $rootScope.apiAddress+"tournament/registered",
        headers: {
           'Authorization':  "Bearer "+ $rootScope.access_token
         }
    })
    .then(function mySucces(response) {
       $scope.tournaments = response.data;
    }, function myError(response) {
       console.log(response);
    });
}]);

app.controller('TournamentCtrl', ['$scope', '$rootScope', '$http', '$stateParams', '$ionicSlideBoxDelegate', function($scope, $rootScope, $http, $stateParams, $ionicSlideBoxDelegate) {
  var round_nb;
  $http({
      method : "GET",
      url : $rootScope.apiAddress+"tournaments/"+$stateParams.tournamentId,
      headers: {
         'Authorization':  "Bearer "+ $rootScope.access_token
       }
  })
  .then(function mySucces(response) {
     $scope.tournament = response.data;
     $scope.players = $scope.tournament.accounts;

     $scope.date = new Date($scope.tournament.date_begin);
     $scope.date = $scope.date.toLocaleString();
     console.log(response.data);

  }, function myError(response) {
     console.log(response);
  });

  $http({
      method : "GET",
      url : $rootScope.apiAddress+"tournaments/"+$stateParams.tournamentId+"/battles",
      headers: {
         'Authorization':  "Bearer "+ $rootScope.access_token
       }
  })
  .then(function mySucces(response) {
    var battles = [];
    battles = response.data;
    var battles_nb = battles.length;
    $scope.round_nb = battles[Object.keys(battles)[Object.keys(battles).length - 1]].round;
    var battles_by_round = {};

    for (var i = 1; i <= $scope.round_nb; i++) {
      battles_by_round[i] = getBattlesbyRound(battles, i);
    }

    $scope.battles_by_round = battles_by_round;

    console.log(battles);

    console.log(battles_by_round);
    round_nb = $scope.round_nb;

    var window_width = $(window).width();
    //$(".slider-slides").css("width", $scope.round_nb * window_width);
    //$(".slider-slides ion-slide").css("width", window_width);
    //$("ion-scroll").css("width", window_width);

  }, function myError(response) {
     console.log(response);
  });

  $scope.ready = function(idBattle) {
    $http({
        method : "POST",
        url : $rootScope.apiAddress+"battle/"+idBattle+"/ready",
        headers: {
             'Authorization':  "Bearer "+ $rootScope.access_token
           }
    })
    .then(function mySucces(response) {
       location.reload();
    }, function myError(response) {
       console.log("Error while try to set ready");
       console.log(response);
    });
  };

  // var block_height = $(".round_block").height();
  // $(".round_block").css("line-height", block_height+"px");

  $(".ion-chevron-right").click(function(){
    window.scrollTo("#round2");
  });

  //SLIDER
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };

  function getBattlesbyRound(battles, round){
    var array_battles = [];
    battles.forEach(function(element){
      if(element.round == round){
        array_battles.push(element);
      }
    });

    return array_battles;
  }

}]);


