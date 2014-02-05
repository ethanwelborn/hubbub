'use strict';

angular.module('hubbubApp')
  .controller('InteractionClientListCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.interactions = {};

    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    $http.post(
            '/api/v1/interactions',
            JSON.stringify({metric: 200, clientId: '52f1bcb023f1ba8b392f6c44', merchantId: '52f1bc8023f1ba8b392f6c43'}),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).success(function (data) {
            console.log(data);
        });

    $http.get('/api/v1/interactions/'+'52f1bcb023f1ba8b392f6c44/'+'52f1bc8023f1ba8b392f6c43')
    	.success(function (data) {
			console.log(data);
        	$scope.interactions = data;
    	});
  }]);
