'use strict';
 
angular.module('myApp.analytics', ['ngRoute'])
 
// Declared route 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/analytics', {
        templateUrl: 'analytics/analytics.html',
        controller: 'AnalyticsController'
    });
}])

.controller('AnalyticsController', ['$scope', function($scope) {

	$scope.sessions = [];

	var sessions = firebase.database().ref('sessions');
	sessions.on('child_added', function(data){

		var startDate = new Date(0);
		var endTime = data.val().endTime;
		if(data.val().endTime === 0){
			endTime = getRandomArbitrary(data.val().startTime, data.val().startTime + 200);
		}

		startDate.setSeconds(data.val().startTime / 1000);
		var formattedStartDate = moment(startDate).format('DD/MM/YYYY HH:mm:ss');

		var endDate = new Date(0);
		endDate.setSeconds(endTime / 1000);
		var formattedEndtDate = moment(endDate).format('DD/MM/YYYY HH:mm:ss');

		var totalTime = (((endTime - data.val().startTime) / 1000) / 60);
		var formattedTotalTime = parseFloat(Math.round(totalTime * 100) / 100).toFixed(2);

		var events = data.val().events;
		for(var i = 0; i < events.length; i++){
			
			var date = new Date(0);
			date.setSeconds(events[i].timestamp / 1000);
			var formattedDate = moment(date).format('DD/MM/YYYY HH:mm:ss');
			events[i].timestamp = formattedDate;

			if(typeof(events[i].error) == 'undefined'){
				events[i].error = false;
			}
		}

		$scope.sessions.push({
			'startTime': formattedStartDate,
			'endTime': formattedEndtDate,
			'totalTime': formattedTotalTime,
			'events': events
		});

	})

	function getRandomArbitrary(min, max) {
  		return Math.random() * (max - min) + min;
	}

}]);