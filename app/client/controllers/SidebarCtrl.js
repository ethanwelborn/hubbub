'use strict';

angular.module('hubbubApp')
  .controller('SidebarCtrl', ['$scope', '$cookies', '$location', function ($scope, $cookies, $location) {
  	if (!$cookies.loggedIn) {
  		$cookies.loggedIn = '';
  	}

  	$scope.variables = {};
  	$scope.variables.showSidebar = $cookies.loggedIn != '';
  
  	$scope.user = {};
  	$scope.user.id = $cookies.loggedIn;
  	$scope.user.type = $cookies.type;

  	$scope.$watch(function() { return $cookies.loggedIn; }, function() {
    	$scope.variables.showSidebar = $cookies.loggedIn != '';
    	$scope.user.id = $cookies.loggedIn;
    	$scope.user.type = $cookies.type;

    	if(!$scope.$$phase) {
  			$scope.$apply();
		}
    });

    $scope.logOut = function() {
    	$cookies.loggedIn = '';
    	$location.path('/');
    };
  }]);