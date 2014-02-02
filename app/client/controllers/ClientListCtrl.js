'use strict';

angular.module('hubbubApp')
  .controller('ClientListCtrl', function ($scope) {
    $scope.clients = [
    	'jeff',
    	'harold',
    	'ken'
    ];
  });
