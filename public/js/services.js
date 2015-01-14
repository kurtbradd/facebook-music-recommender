var module = angular.module('app.services', []);

module.factory('LoginService', ['$window', '$http', '$cookies',
  function($window, $http, $cookies) {
    var login = function() {
      $window.location.href = '/auth/facebook';
    }

    var logout = function(callback) {
      $http.get('/api/logout')
      .success(function(response) {
        delete $cookies.user;
        return callback();
      })
      .error(function(error) {
        return callback(error);
      });
    }

    return { login: login, logout: logout }
  }
]);

module.factory('AuthService', ['$cookies', 
  function($cookies) {
    var isLoggedIn = function() {
      return $cookies.user !== undefined;
    }
    return { isLoggedIn: isLoggedIn }
  }
]);

module.factory('PredictionService', ['$http', 
  function ($http) {
    var getRecommendations = function(callback) {
      var apiEndpoint = '/api/artist/recommendations'
      $http.get(apiEndpoint)
      .success(function (results) {
        callback(null, results);
      })
      .error(function (err) {
        callback(err);
      }); 
    }
    return { getRecommendations: getRecommendations } 
  }    
]);

module.factory('GraphService', ['$http', '$cookies', 
  function ($http, $cookies) {
    var getPageInfo = function(pageId, callback) {
      var apiEndpoint = 'https://graph.facebook.com/' + pageId + '?format=json&access_token=' + JSON.parse($cookies.user).accessToken;
      $http.get(apiEndpoint)
      .success(function(results) {
        callback(null, results);
      })
      .error(function(error) {
        callback(error);
      });
    }
    return { getPageInfo: getPageInfo }
  }
]);
