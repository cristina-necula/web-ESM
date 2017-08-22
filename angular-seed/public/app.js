'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.home'
]).

config(['$routeProvider', function($routeProvider) {
     
    // Routes will be here

    $routeProvider.otherwise({
     	redirectTo:'/home'
    })
}]);
