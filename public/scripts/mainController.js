'use strict';

app.controller('mainController', ['$scope', 'Klasses', function($scope, Klasses) {
	console.log('main controller');
	 //look at the map in server.js
	Klasses.getKlasses()
	.then(function(Klasses) {
		$scope.Klasses = Klasses.data.classes;
		console.log($scope.Klasses.classes);
	});
}]);

