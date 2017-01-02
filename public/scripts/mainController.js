'use strict';

app.controller('mainController', ['klasses', '$scope', function(klasses, $scope) {
	$scope.klasses = klasses.data;
}]);

