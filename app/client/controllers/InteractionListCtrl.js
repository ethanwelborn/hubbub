'use strict';

angular.module('hubbubApp')
  .controller('InteractionListCtrl', ['$scope', function ($scope) {
    $scope.client = {
    	'name': 'Mel Brooks',
    	'info': 'Funny director.'
    };
  }]);
