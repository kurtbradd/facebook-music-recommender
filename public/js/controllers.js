var module = angular.module('app.controllers', []);

module.controller('LoginController', ['$scope', 'LoginService',
  function($scope, LoginService) {
    $scope.login = function() {
      LoginService.login();
    }
  }
]);

module.controller('AppController', ['$scope','$state','$cookies','LoginService','PredictionService','GraphAPI',
  function($scope, $state, $cookies, LoginService, PredictionService, GraphAPI) {

    $scope.recommendations = null;

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

    PredictionService.getRecommendations(function (err, results) {
      var recommendations = results.itemScores;
      var artistInfo = {};
      var count = 0;
      var done = function () {
        count++;
        if (count == recommendations.length) {
          $scope.recommendations = recommendations.map(function (map) {
            var artistData = artistInfo[map.item];
            var isArtist = null;
            if (artistData && artistData.hasOwnProperty('category')) {
              if (artistData.category == "Musician/band") isArtist = true;
            }
            return {artistInfo: artistData, score: map.score, isArtist:isArtist};
          }).filter(function (filter) {
            if (filter.isArtist) return true;
          });
        }
      }
      recommendations.forEach(function (result) {
        GraphAPI.getInfoForPage(result.item, function (err, data) {
          done();
          if (data && data.name) artistInfo[result.item] = data;
        })
      })
    });
  }
]);