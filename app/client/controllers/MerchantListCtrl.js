'use strict';

angular.module('hubbubApp')
  .controller('MerchantListCtrl', ['$http', '$scope', function ($http, $scope) {
  	$scope.merchants = {};

    $http.get('/api/v1/merchants')
    	.success(function (data) {
	        $scope.merchants = data;
	    });
  }]);
