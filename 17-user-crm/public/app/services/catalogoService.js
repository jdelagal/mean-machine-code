angular.module('catalogoService', [])

.factory('Catalogo', function($http) {

	// create a new object
	var catalogoFactory = {};

	// get a single catalogo
	catalogoFactory.get = function(id) {
		return $http.get('/api/catalogos/' + id);
	};

	// get all catalogos
	catalogoFactory.all = function() {
		return $http.get('/api/catalogos/');

	};

	// create a catalogo
	catalogoFactory.create = function(catalogoData) {
		return $http.post('/api/catalogos/', catalogoData);
	};

	// update a catalogo
	catalogoFactory.update = function(id, catalogoData) {
		return $http.put('/api/catalogos/' + id, catalogoData);
	};
		// return our entire catalogoFactory object
	return catalogoFactory;

});