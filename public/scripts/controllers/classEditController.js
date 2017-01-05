app.controller('classEditController', ['$scope', '$routeParams', function($scope, $routeParams) {
	console.log('class edit controller');

	
	$scope.id = $routeParams.id;
	console.log($scope.id);

	// var klass = function() {
	// 	return $http.get('/classes/:klassID', function successCallback(response) {
	// 		console.log('successfully got class to edit');
	// 		console.log(response);
	// 		return response;
	// 	}, function errorCallback(response) {
	// 		console.log('bad get class call');
	// 		console.log(response);
	// 		return response;
	// 	});
	// }


}]);