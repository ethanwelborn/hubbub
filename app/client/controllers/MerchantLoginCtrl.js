'use strict';

angular.module('hubbubApp')
  .controller('MerchantLoginCtrl', ['$scope', '$http', '$location', '$cookies', function ($scope, $http, $location, $cookies) {
    // log out any user
    $cookies.hubbub_loggedIn = '';
    $cookies.hubbub_type = '';

    $scope.merchant = {};
    $scope.error = {};

    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    $scope.login = function() {

        $scope.error = {};

        if (!$scope.merchant.username || !$scope.merchant.password) {
            $scope.error.empty = true;
            return;
        }

    	$http.post(
    			'/api/v1/merchants/attempt/login',
    			JSON.stringify($scope.merchant),
    			{
    				headers: {
    					'Content-Type': 'application/json'
    				}
    			}
    		).success(function (data) {
    			if (!data.match(/error/g)) {
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
