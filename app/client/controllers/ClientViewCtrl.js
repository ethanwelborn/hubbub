'use strict';

angular.module('hubbubApp')
  .controller('ClientViewCtrl', ['$scope', '$routeParams', '$http', '$cookies', '$location', function ($scope, $routeParams, $http, $cookies, $location) {
    
    if (!$cookies.hubbub_loggedIn) {
        $location.path('/');
    }

    $scope.client = {};

    $scope.error = {};
    $scope.success = {};

    $http.get('/api/v1/clients/' + $routeParams.clientId)
    	.success(function (data) {
	        $scope.client = data;
	    });

	$scope.updateClient = function() {

		$scope.error = {};
		$scope.success = {};

		if (!$scope.client.name || !$scope.client.username || !$scope.client.password) {
			$scope.error.empty = true;
			return;
		}

		$http.put(
            '/api/v1/clients/' + $cookies.hubbub_loggedIn,
            JSON.stringify($scope.client),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).success(function (data) {
            if (data != '') {
            	$scope.success.updated = true;
            }
            else {
                $scope.error.invalid = true;
            }
        });
	};
  }]);
