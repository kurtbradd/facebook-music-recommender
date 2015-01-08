var dependencies = ['ui.router', 'app.controllers', 'app.directives', 'app.services'];
var app = angular.module('app', dependencies);

app.run(['$rootScope', '$state', '$stateParams',
  function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  } 
]);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 
  function($stateProvider, $urlRouteProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouteProvider.otherwise('/');
    $stateProvider
    .state('home', {
      url: '/',
      controller: 'LoginController',
      templateUrl: 'views/landing-page.html'
    });
  }
]);