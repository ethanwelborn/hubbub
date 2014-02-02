'use strict';

angular.module('hubbubApp')
  .controller('ClientNewCtrl', function ($scope) {
    $scope.clients = [
    	'jeff',
    	'harold',
    	'ken'
    ];
  });
