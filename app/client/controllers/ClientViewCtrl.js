'use strict';

angular.module('hubbubApp')
  .controller('ClientViewCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {
    $scope.client = {};

    $scope.error = {};

    $http.get('/api/v1/clients/' + $routeParams.clientId)
    	.success(function (data) {
	        $scope.client = data;
	    });

	$scope.updateClient = function() {

		$scope.error = {};

		if (!$scope.client.name || !$scope.client.username || !$scope.client.password) {
			$scope.error.empty = true;
			return;
		}

		$http.put(
            '/api/v1/clients/' + $cookies.hubbub_id,
            JSON.stringify($scope.client),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).success(function (data) {
            if (data != '') {

            }
            else {
                $scope.error.invalid = true;
            }
        });
	};
  }]);
