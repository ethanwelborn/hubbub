'use strict';

angular.module('hubbubApp')
  .controller('InteractionClientListCtrl', ['$scope', function ($scope) {
    $scope.client = {
    	'name': 'Mel Brooks',
    	'info': 'Funny director.'
    };
  }]);
