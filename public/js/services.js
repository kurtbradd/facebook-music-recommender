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