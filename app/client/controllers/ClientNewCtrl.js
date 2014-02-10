'use strict';

angular.module('hubbubApp')
  .controller('ClientNewCtrl', ['$http', '$scope', function ($http, $scope) {
    $scope.client = {};

    $scope.error = {};

    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    $scope.createClient = function() {

        $scope.error = {};

        if (!$scope.client.name || !$scope.client.username || !$scope.client.password) {
            $scope.error.empty = true;
        }

    	$http.post(
            '/api/v1/clients',
            JSON.stringify($scope.client),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).success(function (data) {
            if (data != '') {

            }
            else {
                $scope.error.invalid = true;
            }
        });
    };
  }]);
