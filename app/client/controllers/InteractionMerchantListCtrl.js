'use strict';

angular.module('hubbubApp')
  .controller('InteractionMerchantListCtrl', ['$scope', '$http', '$cookies', '$location', '$routeParams', function ($scope, $http, $cookies, $location, $routeParams) {

    if (!$cookies.hubbub_loggedIn) {
        $location.path('/');
    }

    $scope.interactions = {};

    $http.get('/api/v1/interactions/' + $cookies.hubbub_loggedIn + '/' + $routeParams.merchantId)
      .success(function (data) {
          $scope.interactions = data;
      });
  }]);
