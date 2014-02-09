'use strict';

angular.module('hubbubApp')
  .controller('HomeCtrl', ['$scope', '$cookies', '$location', function ($scope, $cookies, $location) {
    if ($cookies.loggedIn) {
    	$location.path('/'+$cookies.type+'/'+$cookies.loggedIn);
    }
  }]);
