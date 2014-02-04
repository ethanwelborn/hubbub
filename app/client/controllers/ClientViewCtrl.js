'use strict';

angular.module('hubbubApp')
  .controller('ClientViewCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {
    $scope.client = {};

    $http.get('/api/v1/clients/' + $routeParams.clientId)
    	.success(function (data) {
	        $scope.client = data;
	    });
  }]);
