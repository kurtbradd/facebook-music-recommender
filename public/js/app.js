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
      templateUrl: 'views/main-page.html'
    });
  }
]);

app.run(['$rootScope', '$state', '$stateParams', '$location', 'AuthService',
  function($rootScope, $state, $stateParams, $location, AuthService) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    $rootScope.$on('$stateChangeStart', 
      function(event, toState, toParams, fromState, fromParams) {  
        var isLoggedIn = AuthService.isLoggedIn();
        isLoggedIn.then(function(result) {
          event.preventDefault();
          if (!result.data.session) { $location.path('/'); }
          if (result.data.session && toState.name === 'home') { $location.path('/main'); }
        });
      }
    );
  } 
]);