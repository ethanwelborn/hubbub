'use strict';

angular.module('hubbubApp')
  .controller('InteractionViewCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {
    $scope.interaction = {};

    $http.get('/api/v1/interactions/'+$routeParams.interactionId)
    	.success(function (data) {
			console.log(data);
        	$scope.interaction = data;
    	});
  }]);
