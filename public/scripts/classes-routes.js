'use strict';

app.config(function($routeProvider) {
	console.log('boo');
	console.log($routeProvider);
	$routeProvider
	.when('/classes', {
		controller: 'mainController',
	})
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