'use strict';
 
angular.module('myApp.home', ['ngRoute'])
 
// Declared route 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'HomeController'
    });
}])
 
// Home controller
.controller('HomeController', ['$scope', '$location', function($scope, $location) {

	$scope.SignIn = function(event){
		event.preventDefault();

		var email = $scope.user.email;
		var password = $scope.user.password;
		
		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(function(user){
				$location.path("/dashboard");
				$scope.$apply();
			})
			.catch(function(error) {
				var errorCode = error.code;
				var errorMessage = error.message;
			});
	}
}]);