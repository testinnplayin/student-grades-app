app.controller('classCreateController', ['$scope', '$http', function($scope, $http) {
	console.log('class create controller');

	console.log('submission started');

	$scope.classSubmit = function(e)
	{

		let className = $scope.className,
			subject = $scope.subject,
			gradeLevel = $scope.gradeLevel,
			term = $scope.term;

		var klassObj = {
			className: className,
			subject: subject,
			gradeLevel: gradeLevel,
			term: term
		};

		console.log(klassObj);

		return $http.post('/classes', klassObj)
		.then(function successCallback(response) {
			console.log('successful post');
			return response;
		}, function errorCallback(response) {
			console.error('there has been an error on post');
			return response;
		});
	}


}]);

