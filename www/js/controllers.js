var apiAddress = "http://192.168.1.41/tournamentmanager/web/app_dev.php/";

angular.module('starter.controllers', [])

.controller('AppCtrl', ['$scope', '$rootScope','$ionicModal', '$timeout', 'localStorageService', '$http', function($scope, $rootScope, $ionicModal, $timeout, localStorageService, $http) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  $rootScope.apiAddress = apiAddress;

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    $http({
        method : "POST",
        url : $rootScope.apiAddress+"login_check",
        data: $scope.loginData
    })
    .then(function mySucces(response) {
       localStorageService.set("access_token", response.data.token);
    }, function myError(response) {
       console.log(response.statusText);
    });
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  $rootScope.logout = function(){
    localStorageService.remove("access_token");
    delete $rootScope.access_token;
    delete $rootScope.me;
    setTimeout(function(){
      location.reload();
    },500);
  }

  // $scope.$on('$home.enter', function(e) {
  //   $rootScope.access_token = localStorageService.get("access_token");
  //   $http({
  //       method : "GET",
  //       url : $rootScope.apiAddress+"me",
  //       headers: {
  //          'Authorization':  "Bearer "+ $rootScope.access_token
  //        }
  //   })
  //   .then(function mySucces(response) {
  //      $rootScope.user = response.data;
  //   }, function myError(response) {
  //      console.log("... Invalid token !");
  //   });

  //   $http({
  //     method : "GET",
  //     url : $rootScope.apiAddress,
  //     headers: {
  //      'Authorization':  "Bearer "+ $rootScope.access_token
  //    }
  //   }).then(function mySucces(response) {
  //       $scope.myWelcome = response.data;
  //   }, function myError(response) {
  //       console.log("... Invalid token !");
  //   });
  //   console.log("hello");
  //   console.log($rootScope.user);
  // });
}])

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('HomeCtrl', ['$scope', '$rootScope', 'localStorageService', '$http', function($scope, $rootScope, localStorageService, $http) {
  $scope.tournaments = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];

  $rootScope.access_token = localStorageService.get("access_token");
  $http({
      method : "GET",
      url : $rootScope.apiAddress+"me",
      headers: {
         'Authorization': "Bearer "+$rootScope.access_token
       }
  })
  .then(function mySucces(response) {
     $rootScope.user = response.data;
  }, function myError(response) {
     console.log("... Invalid token !");
  });

  console.log($rootScope.access_token);
  console.log($rootScope.apiAddress+"me");
}])

.controller('TournamentCtrl', function($scope, $stateParams) {
  $scope.tournament = { name: 'Cowbell', id: 6, game: 'Hearthstone', begin_date: '10/08/2016', status: 'Ouvert', desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam commodo, nibh ac feugiat sagittis, metus diam tristique nibh, ac vehicula arcu mi vitae odio. Sed malesuada gravida augue, sed lobortis ligula scelerisque non." };

  $scope.players = [
    { pseudo: 'john45Doe' },
    { pseudo: 'test25' },
    { pseudo: 'oklm789' },
    { pseudo: '777GG' },
    { pseudo: 'mine777' },
  ];
});
