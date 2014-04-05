'use strict';

angular.module('hubbubApp')
  .controller('InteractionListCtrl', ['$scope', '$http', '$cookies', '$location', function ($scope, $http, $cookies, $location) {

    if (!$cookies.hubbub_loggedIn) {
        $location.path('/');
    }

    $scope.interactions = {};

    $http.get('/api/v1/interactions/all/'+$cookies.hubbub_loggedIn)
      .success(function (data) {
          $scope.interactions = data;
          $scope.resolveDates();
      });

    $scope.resolveDates = function() {
      var interaction;
      for (var i = 0; i < $scope.interactions.length; i++) {
        interaction = $scope.interactions[i];
        if (!interaction.timestamp) {
          interaction.timestamp = '';
        }
        interaction.timestamp = new Date(interaction.timestamp.replace(/-/g,"/"));
      }
    }
  }]);
