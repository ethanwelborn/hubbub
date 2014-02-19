'use strict';

angular.module('hubbubApp')
  .controller('InteractionMerchantListCtrl', ['$scope', '$http', '$cookies', '$location', function ($scope, $http, $cookies, $location) {

  	if (!$cookies.hubbub_loggedIn) {
        $location.path('/');
    }

    $scope.interactions = {};

    $http.get('/api/v1/interactions/'+'52f1bcb023f1ba8b392f6c44/'+'52f1bc8023f1ba8b392f6c43')
    	.success(function (data) {
			console.log(data);
        	$scope.interactions = data;
    	});
  }]);
