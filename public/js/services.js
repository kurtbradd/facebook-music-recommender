var module = angular.module('app.services', []);

module.factory('LoginService', ['$window',
  function($window) {
    var login = function() {
      $window.location.href = '/auth/facebook';
    }
    return { login: login() }
  }
]);

module.factory('AuthService', ['$http', '$rootScope',
  function($http, $rootScope) {
    var isLoggedIn = function() {
      return $http.get('/api/session')
      .success(function(response) {
        if (response.data) { 
          if (response.data.session) { $rootScope.session = response.data.session;  }
        }
      });
    }
    return { isLoggedIn: isLoggedIn() }
  }
]);