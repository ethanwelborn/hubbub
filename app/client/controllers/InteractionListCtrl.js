'use strict';

angular.module('hubbubApp')
  .controller('InteractionListCtrl', ['$scope', 'AuthService', '$http', function ($scope, AuthService, $http) {
    $scope.currentUser = AuthService.currentUser();
    $scope.interactions = {};

    $http.get('/api/v1/interactions/all/'+$scope.currentUser._id)
    	.success(function (data) {
			console.log(data);
        	$scope.interactions = data;
    	});
  }]);
