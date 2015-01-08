var module = angular.module('app.services', []);

module.factory('LoginService', ['$window', 
  function($window) {
    return { 
      login: function() {
        $window.location.href = '/auth/facebook';
      }
    }
  }
])