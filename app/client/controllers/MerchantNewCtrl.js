'use strict';

angular.module('hubbubApp')
  .controller('MerchantNewCtrl', ['$http', '$scope', '$cookies', '$location', function ($http, $scope, $cookies, $location) {
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
            if (!String(data).match(/error/g)) {
                $cookies.hubbub_loggedIn = data._id;
                $cookies.hubbub_username = data.username;
                $cookies.hubbub_type = 'merchants';
                $location.path('/merchants/'+$cookies.hubbub_loggedIn);
            }
            else {
                $scope.error.invalid = true;
            }
        });
    };
  }]);
