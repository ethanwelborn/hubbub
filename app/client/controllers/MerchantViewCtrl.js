'use strict';

angular.module('hubbubApp')
  .controller('MerchantViewCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {
    $scope.merchant = {};

    $scope.error = {};

    $http.get('/api/v1/merchants/' + $routeParams.merchantId)
    	.success(function (data) {
	        $scope.merchant = data;
	    });

	$scope.updateMerchant = function() {
		$scope.error = {};

		if (!$scope.merchant.name || !$scope.merchant.username || !$scope.merchant.password) {
			$scope.error.empty = true;
			return;
		}

		$http.put(
            '/api/v1/merchants/' + $cookies.hubbub_id,
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
