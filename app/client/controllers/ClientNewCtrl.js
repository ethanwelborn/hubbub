'use strict';

angular.module('hubbubApp')
  .controller('ClientNewCtrl', ['$http', '$scope', '$cookies', '$location', function ($http, $scope, $cookies, $location) {
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
            if (!data.match(/error/g)) {
                $cookies.hubbub_loggedIn = data._id;
                $cookies.hubbub_username = data.username;
                $cookies.hubbub_type = 'clients';
                $location.path('/clients/'+$cookies.hubbub_loggedIn);
            }
            else {
                $scope.error.invalid = true;
            }
        });
    };
  }]);
