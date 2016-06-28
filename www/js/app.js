// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

var app = angular.module('starter', ['ionic', 'starter.controllers', 'LocalStorageModule']);

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

  //$http.defaults.headers.common.Authorization = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyJ9.eyJleHAiOjE0NjcxODc1NDQsInVzZXJuYW1lIjoiQW5nZWxldHRlUGFpZW1lbnRAZGF5cmVwLmNvbSIsImlhdCI6IjE0NjcxMDExNDQifQ.KcexaU6guT6baZYAp6w2-TTnd8QrBTCFJvMgynVAbQNrMj0OAU47gIveRhFDnVMaGgjvGR24wJGENCpbNmKtsIhtl5nP8qwm9VlTFP30Af4rh2riPkB_CqBMgUsbk8pHM9xJXQIK1rVZDnPiws1l3BRnT5E6oA2S2SaKm3vplxLv8-z9s4iRmoWpV2LCN6jyv2eompbz3QUnBt_eY6Rpwm18lHGhL8cSfZkS5cgG75hKeqybUKyhqfzd_5RjH1j0AGU8fqL6bAeSBJ5h0sTYly-q7aTwjpdY25d5FI_gaPc96w_gKJE0JAhYdP7WsK_cJSOE7htblU-g07OT-ov4x8eYynQMjM_J5Irjx7O7ySCKTr7BlYXmeYTy_HVwBtD1tXIWyRX2iKpgrDVGkcWhg3MVduRJd8Pk8I4NTWZvKRn7Pneq5uhjtHStuA7e6LFaP5jDCRs5skGSOHTGn1LNWcEjm06BHrEMJGXJs1_Y8rB7B9ljUn16keu-DWihCl9iqxFaW1hj0gC3vRfFxD4jhc0ekwnLn9VVS2-XZmyf9L00YrbS11BOj-0Ytq6RKbGh6sYaRuyT_qAofxwtRfQcYP0zi2YBYYvGp8BziP97b8XV1JKiPPAnTikKrgvZ7F5v9JA2cyTNO1SAiowrtelcMomSlFb_pPZAVSOIoFzGm70';
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

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
    url: '/browse',
    views: {
      'menuContent': {
        templateUrl: 'templates/browse.html'
      }
    }
  })
  .state('app.playlists', {
    url: '/playlists',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlists.html',
        controller: 'PlaylistsCtrl'
      }
    }
  })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
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
