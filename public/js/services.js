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

module.factory('AuthService', ['$cookies', function($cookies) {
    var isLoggedIn = function() {
      return $cookies.user !== undefined;
    }
    return { isLoggedIn: isLoggedIn}
  }
]);

module.factory('PredictionService', ['$http', function ($http) {
  return {
    getRecommendations: function (cb) {
      var apiEndpoint = '/api/artist/recommendations'
      $http.get(apiEndpoint)
      .success(function (results) {
        cb(null, results);
      })
      .error(function (err) {
        cb(err);
      }) 
    }
  }
}])

module.factory('GraphAPI', ['$http', function ($http) {
  return {
    getInfoForPage: function (pageID, cb) {
      var apiEndpoint = 'https://graph.facebook.com/' + pageID;
      $http.get(apiEndpoint)
      .success(function (data) {
        cb(null, data);
      })
      .error(function (err) {
        cb(err);
      }) 
    }
  }
}])
