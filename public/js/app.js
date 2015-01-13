var dependencies = ['ui.router', 'ngCookies', 'app.controllers', 'app.directives', 'app.services'];
var app = angular.module('app', dependencies);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 
  function($stateProvider, $urlRouteProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouteProvider.otherwise('/');
    $stateProvider
    .state('home', {
      url: '/',
      controller: 'LoginController',
      templateUrl: 'views/landing-page.html'
    })
    .state('main', {
      url: '/main',
      controller: 'AppController',
      templateUrl: 'views/main-page.html'
    });
  }
]);

app.run(['$rootScope', '$state', '$stateParams', '$cookies', 'AuthService',
  function($rootScope, $state, $stateParams, $cookies, AuthService) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    $rootScope.$on('$stateChangeStart', 
      function(event, toState, toParams, fromState, fromParams) {
        if (toState.name === 'main') {
          if (!AuthService.isLoggedIn()) {
            event.preventDefault();
            $state.go('home');
          }
        }
        else if (toState.name === 'home') {
          if (AuthService.isLoggedIn()) {
            event.preventDefault();
            $state.go('main');
          }
        }
      }
    );

  } 
]);