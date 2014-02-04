'use strict';

angular.module('hubbubApp')
  .controller('ClientNewCtrl', ['$http', '$scope', function ($http, $scope) {
    $scope.client = {};

    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    $scope.createClient = function() {
    	$http.post(
            '/api/v1/clients',
            JSON.stringify($scope.client),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).success(function (data) {
            console.log(data);
        });
    };
  }]);
