var module = angular.module('app.controllers', []);

module.controller('LoginController', ['$scope', 'LoginService',
  function($scope, LoginService) {
    $scope.login = function() {
      LoginService.login();
    }
  }
]);

module.controller('AppController', ['$scope', '$state', '$cookies', 'LoginService',
  function($scope, $state, $cookies, LoginService) {
    $scope.logout = function() {
      LoginService.logout(function(error) {
        if (error === undefined) {
          $state.go('home');
        }
      });
    }

    $scope.getPictureLink = function() {
      var facebookUrl = 'https://graph.facebook.com/v2.2/';
      facebookUrl += JSON.parse($cookies.user).id;
      facebookUrl += '/picture?format=json&access_token=';
      facebookUrl += JSON.parse($cookies.user).accessToken;
      return facebookUrl;
    }
  }
]);