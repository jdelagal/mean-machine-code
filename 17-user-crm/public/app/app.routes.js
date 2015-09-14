angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {

	$routeProvider

		// route for the home page
		.when('/', {
			templateUrl : 'app/views/pages/home.html'
		})
		
		// login page
		.when('/login', {
			templateUrl : 'app/views/pages/login.html',
   			controller  : 'mainController',
    			controllerAs: 'login'
		})
		
		// show all users
		.when('/users', {
			templateUrl: 'app/views/pages/users/all.html',
			controller: 'userController',
			controllerAs: 'user'
		})

		// form to create a new user
		// same view as edit page
		.when('/users/create', {
			templateUrl: 'app/views/pages/users/single.html',
			controller: 'userCreateController',
			controllerAs: 'user'
		})

		// page to edit a user
		.when('/users/:user_id', {
			templateUrl: 'app/views/pages/users/single.html',
			controller: 'userEditController',
			controllerAs: 'user'
		})


		// show all catalogo
		.when('/catalogos', {
			templateUrl: 'app/views/pages/catalogos/all.html',
			controller: 'catalogoController',
			controllerAs: 'catalogo'
		})


		// form to create a new catalogo
		// same view as edit page
		.when('/catalogos/create', {
			templateUrl: 'app/views/pages/catalogos/single.html',
			controller: 'catalogoCreateController',
			controllerAs: 'catalogo'
		})

				// page to edit a catalogo
		.when('/catalogos/:catalogo_id', {
			templateUrl: 'app/views/pages/catalogos/single.html',
			controller: 'catalogoEditController',
			controllerAs: 'catalogo'
		})

	$locationProvider.html5Mode(true);

});
