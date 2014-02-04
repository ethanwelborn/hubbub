'use strict';

angular.module('hubbubApp')
  .controller('ClientEditCtrl', ['$scope', function ($scope) {
    $scope.client = {
    	'name': 'Mel Brooks',
    	'info': 'Funny director.'
    };
  }]);
