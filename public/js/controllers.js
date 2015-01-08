var module = angular.module('app.controllers', []);

module.controller('LoginController', ['$scope', '$state', '$window', 'LoginService',
  function($scope, $state, $window, LoginService) {
    console.log('LoginController has loaded');
    $scope.login = function() {
      LoginService.login();
    }
  }
]);