angular.module('catalogoApp', 
	['ngAnimate', 'app.routes', 'authService', 'mainCtrl', 'userCtrl', 'userService','catalogoCtrl', 'catalogoService','entregableCtrl', 'entregableService', 'consumidorCtrl', 'consumidorService','canalCtrl', 'canalService','entornoCtrl', 'entornoService'])

// application configuration to integrate token into requests
.config(function($httpProvider) {

	// attach our auth interceptor to the http requests
	$httpProvider.interceptors.push('AuthInterceptor');

});