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

		// show all entregables
		.when('/entregables', {
			templateUrl: 'app/views/pages/entregables/all.html',
			controller: 'entregableController',
			controllerAs: 'entregable'
		})

		.when('/entregables/:catalogo_id', {
			templateUrl: 'app/views/pages/entregables/single.html',
			controller: 'entregableCatalogoCreateController',
			controllerAs: 'entregable'
		})		
		
		// page to edit a entregable
		.when('/entregables/editar/:entregable_id', {
			templateUrl: 'app/views/pages/entregables/single.html',
			controller: 'entregableEditController',
			controllerAs: 'entregable'
		})	

		// page to edit a entregable
		.when('/entregables/borrar/:entregable_id', {
			templateUrl: 'app/views/pages/entregables/all.html',
			controller: 'entregableController',
			controllerAs: 'entregable'
		})		

		// page to edit a consumidor
		.when('/consumidores/:catalogo_id', {
			templateUrl: 'app/views/pages/consumidores/single.html',
			controller: 'consumidorCatalogoCreateController',
			controllerAs: 'consumidor'
		})	

		// show all consumidores
		.when('/consumidores', {
			templateUrl: 'app/views/pages/consumidores/all.html',
			controller: 'consumidorController',
			controllerAs: 'consumidor'
		})	

		.when('/consumidores/editar/:consumidor_id', {
			templateUrl: 'app/views/pages/consumidores/single.html',
			controller: 'consumidorEditController',
			controllerAs: 'consumidor'
		})		

		// page to edit a consumidor
		.when('/consumidores/borrar/:consumidor_id', {
			templateUrl: 'app/views/pages/consumidores/all.html',
			controller: 'consumidorController',
			controllerAs: 'consumidor'
		})	
		// show all canales
		.when('/canales', {
			templateUrl: 'app/views/pages/canales/all.html',
			controller: 'canalController',
			controllerAs: 'canal'
		})	

		// page to add a canal
		.when('/canales/:consumidor_id', {
			templateUrl: 'app/views/pages/canales/single.html',
			controller: 'canalConsumidorCreateController',
			controllerAs: 'canal'
		})	

		.when('/canales/editar/:canal_id', {
			templateUrl: 'app/views/pages/canales/single.html',
			controller: 'canalEditController',
			controllerAs: 'canal'
		})		

		// page to edit a canal
		.when('/canales/borrar/:canal_id', {
			templateUrl: 'app/views/pages/canales/all.html',
			controller: 'canalController',
			controllerAs: 'canal'
		})		

		// show all entorno
		.when('/entornos', {
			templateUrl: 'app/views/pages/entornos/all.html',
			controller: 'entornoController',
			controllerAs: 'entorno'
		})		

		.when('/entornos/:entregable_id', {
			templateUrl: 'app/views/pages/entornos/single.html',
			controller: 'entornoEntregableCreateController',
			controllerAs: 'entorno'
		})	

		.when('/entornos/editar/:entorno_id', {
			templateUrl: 'app/views/pages/entornos/single.html',
			controller: 'entornoEditController',
			controllerAs: 'entorno'
		})		

		// page to edit a entorno
		.when('/entornos/borrar/:entorno_id', {
			templateUrl: 'app/views/pages/entornos/all.html',
			controller: 'entornoController',
			controllerAs: 'entorno'
		})	

		.when('/entregables/buscar/:catalogo_id', {
			templateUrl: 'app/views/pages/entregables/all.html',
			controller: 'entregableBuscarController',
			controllerAs: 'entregable'
		})		

		.when('/entornos/buscar/:entregable_id', {
			templateUrl: 'app/views/pages/entornos/all.html',
			controller: 'entornoBuscarController',
			controllerAs: 'entorno'
		})				

	$locationProvider.html5Mode(true);

});
