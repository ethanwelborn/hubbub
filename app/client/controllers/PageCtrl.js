'use strict';

angular.module('hubbubApp')
  .controller('PageCtrl', ['$scope', '$cookies', '$location', function ($scope, $cookies, $location) {

  	if (!$cookies.hubbub_loggedIn) {
  		$cookies.hubbub_loggedIn = '';
  	}
  
  	$scope.user = {};
  	$scope.user.id = $cookies.hubbub_loggedIn;
  	$scope.user.type = $cookies.hubbub_type;
    $scope.user.username = $cookies.hubbub_username;

  	$scope.$watch(function() { return $cookies.hubbub_loggedIn; }, function() {
    	$scope.user.id = $cookies.hubbub_loggedIn;
    	$scope.user.type = $cookies.hubbub_type;
      $scope.user.username = $cookies.hubbub_username;

    	if(!$scope.$$phase) {
  			$scope.$apply();
		}
    });

    $scope.logOut = function() {
    	$cookies.hubbub_loggedIn = '';
      $cookies.hubbub_type = '';
      $cookies.hubbub_username = '';
    	$location.path('/');
    };

  }]);