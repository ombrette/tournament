// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
//var apiAddress = "http://192.168.1.41/tournamentmanager/web/app_dev.php/";
var apiAddress = "http://164.132.110.56/app_dev.php/";

var app = angular.module('starter', ['ionic', 'LocalStorageModule']);

app.run(function($ionicPlatform, $http, localStorageService) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});

app.config(function ($httpProvider) {
  $httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.get = {};
  $httpProvider.defaults.headers.post = {};
  $httpProvider.defaults.headers.put = {};
  $httpProvider.defaults.headers.patch = {};
});

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      }
    }
  })

  .state('app.profile', {
      url: '/profile',
      views: {
        'menuContent': {
          templateUrl: 'templates/profile.html'
        }
      }
    })

  .state('app.singleTournament', {
    url: '/tournaments/:tournamentId',
    views: {
      'menuContent': {
        templateUrl: 'templates/tournamentSingle.html',
        controller: 'TournamentCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});

app.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('tournamentmanager');
});

app.controller('AppCtrl', ['$scope', '$rootScope','$ionicModal', '$timeout', 'localStorageService', '$http', '$state', '$location', function($scope, $rootScope, $ionicModal, $timeout, localStorageService, $http, $state, $location) {

  $scope.loginData = {};

  $rootScope.apiAddress = apiAddress;

  var imgBasePath = "http://"+$location.host()+":"+$location.port()+"/image";

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
    setTimeout(function(){
      location.reload();
    },500);
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
       console.log(response);
       localStorageService.set("access_token", response.data.token);
    }, function myError(response) {
       console.log(response);
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
      $scope.login();
      // location.reload();
    },500);
  }

  $scope.$on('modal.hidden', function() {
    $state.reload();
  });

  // if(!localStorageService.get("access_token")){
  //   $scope.login();
  // }

    if(localStorageService.get("access_token")){
      $rootScope.access_token = localStorageService.get("access_token");
      $http({
          method : "GET",
          url : $rootScope.apiAddress+"me",
          headers: {
             'Authorization':  "Bearer "+ $rootScope.access_token
           }
      })
      .then(function mySucces(response) {
         $scope.user = response.data;

         var debut = new Date().getFullYear();
         var birth_date = new Date($scope.user.birth_date).getFullYear();
         $scope.age = debut - birth_date;
         console.log($scope.user);
         
      }, function myError(response) {
         console.log(response);
      });

      $scope.notification = {
      unread : false
    }

    var notif_id;

    function checkNotif(){
      $http({
        method: 'GET',
        url: $rootScope.apiAddress+'notification/last',
        headers: {
             'Authorization':  "Bearer "+ $rootScope.access_token
           }
      }).then(function successCallback(r) {
        console.log("Notif");
        if(r.data.length > 0){
          $scope.notification.data = r.data[0];
          $scope.notification.unread = true;
          $scope.notif_id = $scope.notification.data.tournament.id;
        }
        console.log($scope.notification);
      }, function errorCallback(r) {
          console.log("Unable to check for notification");
      });
    }


    $scope.notification.view = function(notification){
      $scope.notification.unread = false;
      $http({
        method: 'POST',
        url: $rootScope.apiAddress+'notification/'+notification+'/seen',
        headers: {
             'Authorization':  "Bearer "+ $rootScope.access_token
           }
      }).then(function successCallback(r) {
        console.log("Notification set as read");
        $state.go('app.singleTournament',{tournamentId : $scope.notif_id});
      }, function errorCallback(r) {
          console.log("Unable to set notification as read");
      });
    }

    //initialize Bootstrap components
    $(function () {
      //check notif on load and every 15 sec
      checkNotif();
      var r = setInterval(function(){
        checkNotif();
      },15000);
    });
  }

  $rootScope.getImagePath = function(imgName){
      return imgBasePath+"/"+imgName;
    }

}]);