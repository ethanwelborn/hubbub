'use strict';

angular.module('hubbubApp')
  .controller('MerchantLoginCtrl', ['$scope', '$http', '$location', '$cookies', function ($scope, $http, $location, $cookies) {
    // log out any user
    $cookies.loggedIn = '';
    $cookies.type = '';

    $scope.merchant = {};
    $scope.error = {};

    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    $scope.login = function() {
    	$http.post(
    			'/api/v1/merchants/attempt/login',
    			JSON.stringify($scope.merchant),
    			{
    				headers: {
    					'Content-Type': 'application/json'
    				}
    			}
    		).success(function (data) {
    			if (data != '') {
    				$cookies.loggedIn = data._id;
    				$cookies.type = 'merchants';
    				$location.path('/merchants/'+$cookies.loggedIn);
    			}
    			else {
    				$scope.error.invalid = true;
    			}
    		});
    };
  }]);
