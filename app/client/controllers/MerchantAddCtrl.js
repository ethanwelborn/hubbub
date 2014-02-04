'use strict';

angular.module('hubbubApp')
  .controller('MerchantAddCtrl', ['$scope', function ($scope) {
    $scope.clients = [
    	'jeff',
    	'harold',
    	'ken'
    ];
  }]);
