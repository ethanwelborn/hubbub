'use strict';

angular.module('hubbubApp')
  .controller('InteractionViewCtrl', ['$scope', '$routeParams', '$http', '$cookies', '$location', function ($scope, $routeParams, $http, $cookies, $location) {

  	if (!$cookies.hubbub_loggedIn) {
        $location.path('/');
    }

    $scope.interaction = {};

    $http.get('/api/v1/interactions/'+$routeParams.interactionId)
    	.success(function (data) {
        	$scope.interaction = data;
    	});
  }]);