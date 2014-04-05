'use strict';

angular.module('hubbubApp')
  .controller('MerchantViewCtrl', ['$scope', '$routeParams', '$http', '$cookies', '$location', function ($scope, $routeParams, $http, $cookies, $location) {
    
    if (!$cookies.hubbub_loggedIn) {
        $location.path('/');
    }

    $scope.merchant = {};

    $scope.error = {};
    $scope.success = {};

    $http.get('/api/v1/merchants/' + $routeParams.merchantId)
    	.success(function (data) {
	        $scope.merchant = data;
	    });

	$scope.updateMerchant = function() {
		$scope.error = {};
		$scope.success = {};

		if (!$scope.merchant.name || !$scope.merchant.username || !$scope.merchant.password) {
			$scope.error.empty = true;
			return;
		}

        var newObj = {};
        newObj.name = $scope.merchant.name;
        newObj.username = $scope.merchant.username;
        newObj.password = $scope.merchant.password;

		$http.put(
            '/api/v1/merchants/' + $cookies.hubbub_loggedIn,
            JSON.stringify(newObj),
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
