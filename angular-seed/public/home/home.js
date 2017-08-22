'use strict';
 
angular.module('myApp.home', ['ngRoute'])
 
// Declared route 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl'
    });
}])
 
// Home controller
.controller('HomeCtrl', ['$scope', function($scope) {

	$scope.SignIn = function(event){
		event.preventDefault();

		var email = $scope.user.email;
		var password = $scope.user.password;
		
		firebase.auth().createUserWithEmailAndPassword(email, password)
			.then(function(user){
				
			})
			.catch(function(error) {
				var errorCode = error.code;
				var errorMessage = error.message;
			});
	}
}]);