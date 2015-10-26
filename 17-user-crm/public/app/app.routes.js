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

		.when('/a_entregables/:catalogo_id', {
			templateUrl: 'app/views/pages/entregables/single.html',
			controller: 'entregableCatalogoCreateController',
			controllerAs: 'entregable'
		})		
		
		// page to edit a entregable
		.when('/entregables/:entregable_id', {
			templateUrl: 'app/views/pages/entregables/single.html',
			controller: 'entregableEditController',
			controllerAs: 'entregable'
		})	

		// page to edit a consumidor
		.when('/a_consumidores/:catalogo_id', {
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

		.when('/consumidores/:consumidor_id', {
			templateUrl: 'app/views/pages/consumidores/single.html',
			controller: 'consumidorEditController',
			controllerAs: 'consumidor'
		})		

		// show all canales
		.when('/canales', {
			templateUrl: 'app/views/pages/canales/all.html',
			controller: 'canalController',
			controllerAs: 'canal'
		})	

		// page to add a canal
		.when('/a_canales/:consumidor_id', {
			templateUrl: 'app/views/pages/canales/single.html',
			controller: 'canalConsumidorCreateController',
			controllerAs: 'canal'
		})	

		.when('/canales/:canal_id', {
			templateUrl: 'app/views/pages/canales/single.html',
			controller: 'canalEditController',
			controllerAs: 'canal'
		})		

		// show all entorno
		.when('/entornos', {
			templateUrl: 'app/views/pages/entornos/all.html',
			controller: 'entornoController',
			controllerAs: 'entorno'
		})		

		.when('/a_entornos/:entregable_id', {
			templateUrl: 'app/views/pages/entornos/single.html',
			controller: 'entornoEntregableCreateController',
			controllerAs: 'entorno'
		})	

		.when('/entornos/:entorno_id', {
			templateUrl: 'app/views/pages/entornos/single.html',
			controller: 'entornoEditController',
			controllerAs: 'entorno'
		})		

		.when('/b_entregables/:catalogo_id', {
			templateUrl: 'app/views/pages/entregables/all.html',
			controller: 'entregableBuscarController',
			controllerAs: 'entregable'
		})		

		.when('/b_entornos/:entregable_id', {
			templateUrl: 'app/views/pages/entornos/all.html',
			controller: 'entornoBuscarController',
			controllerAs: 'entorno'
		})	

		.when('/b_consumidores/:catalogo_id', {
			templateUrl: 'app/views/pages/consumidores/all.html',
			controller: 'consumidorBuscarController',
			controllerAs: 'consumidor'
		})	

		.when('/b_canales/:consumidor_id', {
			templateUrl: 'app/views/pages/canales/all.html',
			controller: 'canalBuscarController',
			controllerAs: 'canal'
		})								

	$locationProvider.html5Mode(true);

});
