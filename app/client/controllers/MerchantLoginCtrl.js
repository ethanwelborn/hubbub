'use strict';

angular.module('hubbubApp')
  .controller('MerchantLoginCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $scope.merchant = {};

    $scope.login = function() {
    	// add logic for log in
    	$location.path('/merchants/');
    };
  }]);
