app.controller('classCreateController', ['$scope', '$http', function($scope, $http) {
	console.log('class create controller');

	// $('form').on('submit', '#submit-btn', function(e) {
	// 	e.preventDefault();
	// 	e.stopPropagation();


		// function returnKlass(klass) {
		// 	return $http.post('/classes', klass)
		// 	.then(function successCallback(response) {
		// 		console.log('successful post');
		// 		return response;
		// 	}, function errorCallback(response) {
		// 		console.error('there has been an error on post');
		// 		return response;
		// 	});
		// };
		//
		// returnKlass(klassObj);
	// });

	$scope.classSubmit = function(e)
	{
		let className = $scope.className,
		subject = $scope.subject,
		gradeLevel = $scope.gradeLevel,
		term = $scope.term;

		klassObj = {
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
