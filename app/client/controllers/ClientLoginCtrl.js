'use strict';

angular.module('hubbubApp')
  .controller('ClientLoginCtrl', ['$scope', '$http', '$location', '$cookies', function ($scope, $http, $location, $cookies) {
    // log out any user
    $cookies.loggedIn = '';
    $cookies.type = '';

    $scope.client = {};
    $scope.error = {};

    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    $scope.login = function() {
    	$http.post(
    			'/api/v1/clients/attempt/login',
    			JSON.stringify($scope.client),
    			{
    				headers: {
    					'Content-Type': 'application/json'
    				}
    			}
    		).success(function (data) {
    			if (data != '') {
    				$cookies.loggedIn = data._id;
    				$cookies.type = 'clients';
    				$location.path('/clients/'+$cookies.loggedIn);
    			}
    			else {
    				$scope.error.invalid = true;
    			}
    		});
    };
  }]);
