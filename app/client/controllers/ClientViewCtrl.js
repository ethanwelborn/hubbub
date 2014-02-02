'use strict';

angular.module('hubbubApp')
  .controller('ClientViewCtrl', function ($scope) {
    $scope.client = {
    	'name': 'Mel Brooks',
    	'info': 'Funny director.'
    };
  });
