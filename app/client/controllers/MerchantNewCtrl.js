'use strict';

angular.module('hubbubApp')
  .controller('MerchantNewCtrl', ['$http', '$scope', function ($http, $scope) {
    $scope.merchant = {};

    $scope.error = {};

    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    $scope.createMerchant = function() {

        $scope.error = {};

        if (!$scope.merchant.name || !$scope.merchant.username || !$scope.merchant.password) {
            $scope.error.empty = true;
        }

    	$http.post(
            '/api/v1/merchants',
            JSON.stringify($scope.merchant),
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
