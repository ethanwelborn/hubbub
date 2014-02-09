'use strict';

angular.module('hubbubApp')
  .controller('InteractionListCtrl', ['$scope', '$http', '$cookies', function ($scope, $http, $cookies) {
    $scope.interactions = {};

    $http.get('/api/v1/interactions/all/'+$cookies.hubbub_loggedIn)
    	.success(function (data) {
        	$scope.interactions = data;
    	});
  }]);
