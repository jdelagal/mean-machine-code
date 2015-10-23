angular.module('entregableService', [])

.factory('Entregable', function($http) {

	// create a new object
	var entregableFactory = {};

	// get all entregables
	entregableFactory.all = function() {
		return $http.get('/api/entregables/');

	};
	// get a single entregable
	entregableFactory.get = function(id) {
		return $http.get('/api/entregables/' + id);
	};
	// create a entregables
	entregableFactory.create = function(id, entregableData) {
		return $http.post('/api/entregables/'+id, entregableData);
	};

	// get a single entregable de un catalogo
	entregableFactory.getEntregableCatalogo = function(id) {
		return $http.get('/api/entregables/' + id);
	};

		// update a entregable
	entregableFactory.update = function(id, entregableData) {
		return $http.put('/api/entregables/' + id, entregableData);
	};

	// delete a entregable
	entregableFactory.delete = function(id) {
		return $http.delete('/api/entregables/' + id);
	};	

	// get all entregables filtrados
	entregableFactory.allBuscar = function(id) {
		return $http.get('/api/entregables/buscar/'+ id);

	};	
	// return our entire entragableFactory object
	return entregableFactory;

});