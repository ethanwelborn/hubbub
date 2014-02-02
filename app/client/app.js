'use strict';

angular.module('hubbubApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/templates/home',
        controller: 'HomeCtrl'
      })
      .when('/clients', {
        templateUrl: '/templates/client-list',
        controller: 'ClientListCtrl'
      })
      .when('/clients/:clientId', {
        templateUrl: '/templates/client-view',
        controller: 'ClientViewCtrl'
      })
      .when('/clients/:clientId/edit', {
        templateUrl: '/templates/client-edit',
        controller: 'ClientEditCtrl'
      })
      .when('/clients/:clientId/new', {
        templateUrl: '/templates/client-new',
        controller: 'ClientNewCtrl'
      })
      .when('/merchants', {
        templateUrl: '/templates/merchant-list',
        controller: 'MerchantListCtrl'
      })
      .when('/merchants/:merchantId', {
        templateUrl: '/templates/merchant-view',
        controller: 'MerchantViewCtrl'
      })
      .when('/merchants/:merchantId/edit', {
        templateUrl: '/templates/merchant-edit',
        controller: 'MerchantEditCtrl'
      })
      .when('/merchants/:merchantId/new', {
        templateUrl: '/templates/merchant-new',
        controller: 'MerchantNewCtrl'
      })
      .when('/add/merchant', {
        templateUrl: '/templates/add-merchant',
        controller: 'AddMerchantCtrl'
      })
      .otherwise({
        templateUrl: 'templates/404'
      });
  });
