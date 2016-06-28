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

app.controller('TournamentCtrl', ['$scope', '$rootScope', '$http', '$stateParams', function($scope, $rootScope, $http, $stateParams) {
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

     var date = new Date($scope.tournament.date_begin);
     date = date.toDateString();
  }, function myError(response) {
     console.log(response);
  });
}]);
