angular
  .module('app', [
        'ionic',
        'app.config',
        'app.animations',
        'app.directive',
        'app.service',
        'app.game',
        'app.filter',

      ])

      .run(function($ionicPlatform, $rootScope, $firebaseAuth, $firebase, $window, $ionicLoading) {
        $ionicPlatform.ready(function() {
          // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
          // for form inputs)
          if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          }
          if (window.StatusBar) {
            StatusBar.styleDefault();
          }


        }); // ...ready(function()
      })

  .config(['$logProvider', function($logProvider) {
     $logProvider.debugEnabled(true); // default is true
  }])

  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('auth', {
        url: '/auth',
        abstract: true,
        templateUrl: "templates/auth.html"
      })
      .state('auth.signin', {
        url: '/signin',
        views: {
          'auth-signin': {
            templateUrl: 'templates/auth/auth-signin.html',
            controller: 'SigninController'
          }
        }
      })
      .state('auth.signup', {
        url: '/signup',
        views: {
          'auth-signup': {
            templateUrl: 'templates/auth/auth-signup.html',
            controller: 'SigninController'
          }
        }
      })
      .state('intro', {
        url: '/intro',
        templateUrl: 'templates/intro.html',
        controller: 'IntroController'
      })
    .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })
      .state('tab.players', {
        url: '/players',
        views: {
          'tab-players': {
            cache: false,
            templateUrl: 'templates/players/players.html',
            controller: 'GameController',
            controllerAs: 'game'
          }
        }
      })
      .state('tab.splash-screen', {
        url: '/splash-screen',
        views: {
          'tab-splash-screen': {
            cache: false,
            templateUrl: 'templates/splash-screen/splash-screen.html'
          }
        }
      })
      .state('tab.main-menu', {
        url: '/main-menu',
        views: {
          'tab-main-menu': {
            cache: false,
            templateUrl: 'templates/main-menu/main-menu.directive.html',
            controller: 'AppController',
            controllerAs: 'app'
          }
        }
      })
      .state('tab.game', {
          url: '/game',
          views: {
            'tab-game': {
              cache: false,
              templateUrl: 'templates/game.html',
              controller: 'GameController',
              controllerAs: 'game'
            }
          }
        })
        .state('tab.game-withPlayers', {
          url: '/game-withPlayers',
          views: {
            'tab-game-withPlayers': {
              cache: false,
              templateUrl: 'templates/game/game-withPlayers.html',
              controller: 'GameController',
              controllerAs: 'game'
            }
          }
        })
        .state('tab.game-withTeams', {
          url: '/game-withTeams',
          views: {
            'tab-game-withTeams': {
              cache: false,
              templateUrl: 'templates/game/game-withTeams.html'
            }
          }
        })
       .state('tab.store', {
          url: '/store',
          views: {
            'tab-store': {
              cache: false,
              templateUrl: 'templates/store/store.directive.html'
            }
          }
        })
      .state('tab.settings', {
          url: '/settings',
          views: {
            'tab-settings': {
              cache: false,
              templateUrl: 'templates/settings/settings.directive.html',
              controller: 'SettingsController',
              controllerAs: 'settings'
            }
          }
        });

     $urlRouterProvider.otherwise('/tab/game');
});
