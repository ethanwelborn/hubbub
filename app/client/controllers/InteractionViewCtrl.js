'use strict';

angular.module('hubbubApp')
  .controller('InteractionViewCtrl', ['$scope', function ($scope) {
    $scope.client = {
    	'name': 'Mel Brooks',
    	'info': 'Funny director.'
    };
  }]);
