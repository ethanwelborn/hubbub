'use strict';

angular.module('hubbubApp')
  .controller('MerchantViewCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {
    $scope.merchant = {};

    $http.get('/api/v1/merchants/' + $routeParams.merchantId)
    	.success(function (data) {
	        $scope.merchant = data;
	    });
  }]);
