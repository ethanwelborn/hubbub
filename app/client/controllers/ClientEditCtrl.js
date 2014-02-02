'use strict';

angular.module('hubbubApp')
  .controller('ClientEditCtrl', function ($scope) {
    $scope.client = {
    	'name': 'Mel Brooks',
    	'info': 'Funny director.'
    };
  });
