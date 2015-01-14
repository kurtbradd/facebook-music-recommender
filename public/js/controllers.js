var module = angular.module('app.controllers', []);

module.controller('LoginController', ['$scope', 'LoginService',
  function($scope, LoginService) {
    $scope.login = function() {
      LoginService.login();
    }
  }
]);

module.controller('AppController', ['$scope', '$state', '$cookies', '$http', 'LoginService', 'PredictionService', 'APIService',
  function($scope, $state, $cookies, $http,LoginService, PredictionService, APIService) {

    $scope.recommendations = null;

    $scope.logout = function() {
      LoginService.logout(function(error) {
        if (error === undefined) {
          $state.go('home');
        }
      });
    }

    $scope.getUsername = function() {
      if (!$cookies.user) return;
      var facebookUrl = 'https://graph.facebook.com/v2.2/';
      facebookUrl += JSON.parse($cookies.user).id;
      facebookUrl += '?format=json&access_token=';
      facebookUrl += JSON.parse($cookies.user).accessToken;
      $http.get(facebookUrl)
      .success(function(response) {
        if (response.name) $scope.user.name = response.name;
      })
      .error(function (error) {
        $scope.userInfo.name = null;
      });
    }

    $scope.getPictureLink = function() {
      if (!$cookies.user) return;
      var facebookUrl = 'https://graph.facebook.com/v2.2/';
      facebookUrl += JSON.parse($cookies.user).id;
      facebookUrl += '/picture?format=json&access_token=';
      facebookUrl += JSON.parse($cookies.user).accessToken;
      return facebookUrl;
    }

    $scope.user = {
      picture: $scope.getPictureLink(),
      name: $scope.getUsername()
    }

    PredictionService.getRecommendations(function(error, results) {
      var recommendations = results.itemScores
      ,   artistInfo      = {};

      recommendations.forEach(function(result) {
        APIService.getPageInfo(result.item, function(error, data) {
          if (data && data.data) artistInfo[result.item] = data.data;
        });
      });
    });

  }
]);