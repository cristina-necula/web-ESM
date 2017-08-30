'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.home',
  'myApp.dashboard',
  'myApp.analytics'
]).

config(['$routeProvider', function($routeProvider) {
     
    // Routes will be here
    $routeProvider.when('/dashboard', {
        templateUrl: 'dashboard/dashboard.html',
        controller: 'DashboardController'
    });
    $routeProvider.when('/analytics', {
        templateUrl: 'analytics/analytics.html',
        controller: 'AnalyticsController'
    });
    $routeProvider.otherwise({
     	redirectTo:'/home'
    })
}]);
