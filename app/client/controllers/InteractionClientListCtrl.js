'use strict';

angular.module('hubbubApp')
  .controller('InteractionClientListCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.interactions = {};

    $http.get('/api/v1/interactions/'+'52f1bcb023f1ba8b392f6c44/'+'52f1bc8023f1ba8b392f6c43')
    	.success(function (data) {
			console.log(data);
        	$scope.interactions = data;
    	});
  }]);
