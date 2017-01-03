'use strict';

app.controller('mainController', ['$scope', 'Klasses', function($scope, Klasses) {
	console.log('controller');
	Klasses.getKlasses();
	// $scope.klasses = klasses.data;
}]);

