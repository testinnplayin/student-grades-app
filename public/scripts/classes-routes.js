'use strict';

app.config(function($routeProvider) {
	console.log('boo');
	console.log($routeProvider);
	$routeProvider
	.when('/', {
		controller: 'mainController',
		templateUrl: '../views/class-list-template.html'
	})
	.when('/classes', {
		controller: 'mainController',
		templateUrl: '../views/class-list-template.html'
	})
	.when('/classes/create', {
		controller: 'classCreateController'
	})
	.when('/classes/edit', {
		controller: 'classEditController'
	})
	.when('/classes/delete', {
		controller: 'classDeleteController'
	});
});

//Jack's example code

// $routeProvider.when('/', {
//     controller: MainCtrl
// });

// $routeProvider.when('/project/:projectId', {
//     controller: ProjectCtrl
// });

// $routeProvider
//     .when('/classes', {
//         controller: 'mainController',
//     })
//    .when('/students/:id',{ controller:'studentController'})