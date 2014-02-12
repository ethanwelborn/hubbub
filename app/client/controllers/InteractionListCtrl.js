'use strict';

angular.module('hubbubApp')
  .controller('InteractionListCtrl', ['$scope', '$http', '$cookies', '$location', function ($scope, $http, $cookies, $location) {

  	if (!$cookies.hubbub_loggedIn) {
        $location.path('/');
    }

    $scope.interactions = {};

    $http.get('/api/v1/interactions/all/'+$cookies.hubbub_loggedIn)
    	.success(function (data) {
        	$scope.interactions = data;
    	});
  }]);
