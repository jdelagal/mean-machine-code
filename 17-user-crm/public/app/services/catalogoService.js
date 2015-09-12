angular.module('catalogoService', [])

.factory('Catalogo', function($http) {

	// create a new object
	var catalogoFactory = {};


	// get all users
	catalogoFactory.all = function() {
		return $http.get('/api/catalogos/');

	};

		// return our entire catalogoFactory object
	return catalogoFactory;

});