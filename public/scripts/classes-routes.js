'use strict';

app.config(function($routeProvider) {
	$routeProvider
	.when('/classes', {
		controller: 'mainController',
		templateUrl: '../index.html',
		resolve: {
			classes: function(Klasses) {
				return Klasses.getKlasses();
			}
		}
	})
	.service("Klasses", function($http) {
		this.getKlasses = function() {
			return $http({
				method: 'GET',
				url: '/classes'
			})
			.then(function successCallback(response) {
				console.log('good response ' + response);
				return response;
			}, function errorCallback(response) {
				console.error('bad response ' + response);
				return response;
			});
		};
	});
});
