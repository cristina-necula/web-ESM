'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.home',
  'myApp.dashboard'
]).

config(['$routeProvider', function($routeProvider) {
     
    // Routes will be here
    $routeProvider.when('/dashboard', {
        templateUrl: 'dashboard/dashboard.html',
        controller: 'DashboardController'
    });
    $routeProvider.otherwise({
     	redirectTo:'/home'
    })
}]);
