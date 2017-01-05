app.controller('classCreateController', ['$scope', '$http', function($scope, $http) {
	console.log('class create controller');

	$('form').on('submit', '#submit-btn', function(e) {
		e.preventDefault();
		e.stopPropagation();

		console.log('submission started');

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

		// function returnKlass(klass) {
			$.post('/classes', klassObj, function() {
				console.log('pie');
			})
			.done(function(response) {
				console.log('successful post');
				return response;
			})
			.fail(function(response) {
				console.error('there has been an error on post');
				return response;
			});
		// };

		// returnKlass(klassObj);

		// return false;
	});
}]);