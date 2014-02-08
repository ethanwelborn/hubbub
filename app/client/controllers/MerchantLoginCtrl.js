'use strict';

angular.module('hubbubApp')
  .controller('MerchantLoginCtrl', ['$scope', '$http', '$location', 'AuthService', function ($scope, $http, $location, AuthService) {
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
    				AuthService.login(data._id, data.username);
    				$location.path('/merchants/'+AuthService.currentUser()._id)
    			}
    			else {
    				$scope.error.invalid = true;
    			}
    		});
    };
  }]);
