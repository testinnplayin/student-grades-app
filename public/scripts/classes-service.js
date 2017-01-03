app.service("Klasses", function($http) {
		this.getKlasses = function() {
			console.log('!');
			return $http({
				method: 'GET',
				url: '/classes'
			})
			.then(function successCallback(response) {
				console.log('good response');
				console.log(response.data.classes[0]);
				return response;
			}, function errorCallback(response) {
				console.error('bad response ' + response);
				return response;
			});
		};

		this.createKlasses = function() {
			console.log('creating');
			return $http({
				method: 'POST',
				url: '/classes/:id'
			})
			.then(function successCallback(response) {
				console.log('good response');
				return response;
			}, function errorCallback(response) {
				console.error('bad response ' + response);
				return response;
			});
		};
});