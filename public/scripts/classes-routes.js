'use strict';

app.config(function($routeProvider) {
	console.log('boo');
	console.log($routeProvider);
	$routeProvider
	.when('/', {
		controller: 'mainController',
		templateUrl: 'views/class-list-template'
	})
	.when('/classes', {
		controller: 'mainController',
		templateUrl: 'views/class-list-template.html'
	})
	.when('/classes/create', {
		controller: 'mainController',
		templateUrl: 'views/class-creation-template.html'
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