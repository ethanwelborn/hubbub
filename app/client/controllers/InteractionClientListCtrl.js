'use strict';

angular.module('hubbubApp')
  .controller('InteractionClientListCtrl', ['$scope', '$http', '$cookies', '$location', '$routeParams', function ($scope, $http, $cookies, $location, $routeParams) {

    if (!$cookies.hubbub_loggedIn) {
        $location.path('/');
    }

    $scope.interactions = {};

    $http.get('/api/v1/interactions/' + $routeParams.clientId + '/' + $cookies.hubbub_loggedIn)
      .success(function (data) {
          $scope.interactions = data;
      });
  }]);
