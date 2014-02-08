'use strict';

angular.module('hubbubApp')
  .controller('ClientLoginCtrl', ['$scope', '$http', '$location', 'AuthService', function ($scope, $http, $location, AuthService) {
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
    				AuthService.login(data._id, data.username);
    				$location.path('/clients/'+AuthService.currentUser()._id)
    			}
    			else {
    				$scope.error.invalid = true;
    			}
    		});
    };
  }]);
