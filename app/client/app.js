'use strict';

angular.module('hubbubApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.haml',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
