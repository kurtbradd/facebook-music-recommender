var module = angular.module('app.controllers', []);

module.controller('LoginController', ['$scope', 'LoginService',
  function($scope, LoginService) {
    $scope.login = function() {
      LoginService.login();
    }
  }
]);

module.controller('AppController', ['$scope', '$state', '$cookies', '$http', 'LoginService',
  function($scope, $state, $cookies, $http, LoginService) {
    
    $scope.logout = function() {
      LoginService.logout(function(error) {
        if (error === undefined) {
          $state.go('home');
        }
      });
    }

    getPictureLink = function() {
      if (!$cookies.user) return;
      var facebookUrl = 'https://graph.facebook.com/v2.2/';
      facebookUrl += JSON.parse($cookies.user).id;
      facebookUrl += '/picture?format=json&access_token=';
      facebookUrl += JSON.parse($cookies.user).accessToken;
      return facebookUrl;
    }

    getUsername = function() {
      if (!$cookies.user) return;
      var facebookUrl = 'https://graph.facebook.com/v2.2/';
      facebookUrl += JSON.parse($cookies.user).id;
      facebookUrl += '?format=json&access_token=';
      facebookUrl += JSON.parse($cookies.user).accessToken;
      $http.get(facebookUrl)
      .success(function(response) {
        if (response.name) $scope.user.name = response.name;
      })
      .error(function (err) {
        $scope.userInfo.name = "Hey there!";
      });
    }


    $scope.user = {
      picture: getPictureLink(),
      name: getUsername()
    }
  }
]);