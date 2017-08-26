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

	$scope.answers = [];
	$scope.surveys =[];
	$scope.tasks =[];
	$scope.workflows = [];

    var answers = firebase.database().ref('answers');
    var surveys = firebase.database().ref('surveys');
    var tasks = firebase.database().ref('tasks');
    var workflows = firebase.database().ref('workflows');

	answers.on('child_added', function(data){
		$scope.answers.push({
			'key': data.key,
			'text': data.val().text
		});
	});

    surveys.on('child_added', function(data) {
		$scope.surveys.push({
			'key': data.key,
			'question': data.val().question,
			'answers': Object.keys(data.val().answers)
		});
    });

    tasks.on('child_added', function (data) {
		$scope.tasks.push({
			'key':data.key,
			'type':data.val().type,
			'tag':data.val().tag,
			'containerActivity':data.val().containerActivity
		});
    });

    workflows.on("child_added", function (data) {
		$scope.workflows.push({
			'key':data.key,
			'survey':data.val().survey,
			'tasks': Object.keys(data.val().tasks)
		});
    });

	$scope.SaveAnswer = function(event){
		event.preventDefault();
		var answerKey = $scope.answer.key;
		var answerText = $scope.answer.text;
		firebase.database().ref('answers/' + answerKey).set(
		{
			text: answerText
		});
		$scope.answer.key = "";
		$scope.answer.text = "";
	}

    $scope.SaveSurvey = function (event) {
		event.preventDefault();

		var surveyKey = $scope.survey.key;
		var question = $scope.survey.question;
		var answers = $scope.survey.answers.split(" ");

		var surveyJson = {};
		surveyJson['question'] = question;
		surveyJson['answers'] = [];

        for (var i = 0, len = answers.length; i < len; i++) {
            surveyJson['answers'][answers[i]] = true;
        }
		firebase.database().ref('surveys/' + surveyKey).set(surveyJson);

        $scope.survey.key = "";
        $scope.survey.question = "";
        $scope.survey.answers = "";
    }

    $scope.SaveTask = function (event) {
		event.preventDefault();

		var taskJson = {};
		taskJson['tag'] = $scope.task.tag;
		taskJson['type'] = $scope.task.type;
		taskJson['containerActivity'] = $scope.task.containerActivity;

		var taskKey = $scope.task.key;
		firebase.database().ref('tasks/' + taskKey).set(taskJson);

        $scope.task.key = "";
        $scope.task.tag = "";
        $scope.task.type = "";
        $scope.task.containerActivity = "";
    }

    $scope.SaveWorkflow = function (event) {
		event.preventDefault();

		var workflowJson = {};
		workflowJson['survey'] = $scope.workflow.survey;
		workflowJson['tasks'] = [];

		var tasks = $scope.workflow.tasks.split(" ");
		for(var i = 0; i < tasks.length; i++){
			workflowJson['tasks'][tasks[i]] = true;
		}

		var workflowKey = $scope.workflow.key;
		firebase.database().ref('workflows/' + workflowKey).set(workflowJson);

		$scope.workflow.key = "";
		$scope.workflow.survey = "";
		$scope.workflow.tasks = "";
    }
	
}]);