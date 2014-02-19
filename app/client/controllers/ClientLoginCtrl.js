'use strict';

angular.module('hubbubApp')
  .controller('ClientLoginCtrl', ['$scope', '$http', '$location', '$cookies', function ($scope, $http, $location, $cookies) {
    // log out any user
    $cookies.hubbub_loggedIn = '';
    $cookies.hubbub_type = '';

    $scope.client = {};
    $scope.error = {};

    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    $scope.login = function() {

        $scope.error = {};

        if (!$scope.client.username || !$scope.client.password) {
            $scope.error.empty = true;
            return;
        }

    	$http.post(
    			'/api/v1/clients/attempt/login',
    			JSON.stringify($scope.client),
    			{
    				headers: {
    					'Content-Type': 'application/json'
    				}
    			}
    		).success(function (data) {
    			if (data != '') {
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
