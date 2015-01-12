var module = angular.module('app.controllers', []);

module.controller('LoginController', ['$scope', '$state', '$window', 'LoginService',
  function($scope, $state, $window, LoginService) {
    var login = function() {
      LoginService.login();
    }
  }
]);

module.controller('AuthController', ['$scope', 'AuthService',
  function($scope, $AuthService) {
    var isLoggedIn = function() {
      AuthService.isLoggedIn();
    }
  }
]);