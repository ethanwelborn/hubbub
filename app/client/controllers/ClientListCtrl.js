'use strict';

angular.module('hubbubApp')
  .controller('ClientListCtrl', ['$http', '$scope', function ($http, $scope) {
  	$scope.clients = {};

    $http.get('/api/v1/clients')
    	.success(function (data) {
	        $scope.clients = data;
	    });
  }]);
