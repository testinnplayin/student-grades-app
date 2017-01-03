app.service("Klasses", function($http) {
		this.getKlasses = function() {
			alert('!');
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