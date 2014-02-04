'use strict';

angular.module('hubbubApp')
  .controller('MerchantNewCtrl', ['$http', '$scope', function ($http, $scope) {
    $scope.merchant = {};

    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    $scope.createMerchant = function() {
    	$http.post(
            '/api/v1/merchants',
            JSON.stringify($scope.merchant),
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
