'use strict';
 
angular.module('myApp.dashboard', ['ngRoute'])
 
// Declared route 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/dashboard', {
        templateUrl: 'dashboard/dashboard.html',
        controller: 'DashboardController'
    });
}])
 
// Home controller
.controller('DashboardController', ['$scope', function($scope) {

	
}]);