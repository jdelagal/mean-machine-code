angular.module('catalogoApp', 
	['ngAnimate', 'app.routes', 'authService', 'mainCtrl', 'userCtrl', 'userService','catalogoCtrl', 'catalogoService','entregableCtrl', 'entregableService', 'consumidorCtrl', 'consumidorService'])

// application configuration to integrate token into requests
.config(function($httpProvider) {

	// attach our auth interceptor to the http requests
	$httpProvider.interceptors.push('AuthInterceptor');

});