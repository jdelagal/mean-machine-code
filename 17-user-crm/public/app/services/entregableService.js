angular.module('entregableService', [])

.factory('Entregable', function($http) {

	// create a new object
	var entregableFactory = {};

	// get all entregables
	entregableFactory.all = function() {
		return $http.get('/api/entregables/');

	};

	// create a entregables
	entregableFactory.create = function(id, entregableData) {
		return $http.post('/api/entregables/'+id, entregableData);
	};

	// get a single entregable de un catalogo
	entregableFactory.getEntregableCatalogo = function(id) {
		return $http.get('/api/entregables/' + id);
	};
	// return our entire entragableFactory object
	return entregableFactory;

});