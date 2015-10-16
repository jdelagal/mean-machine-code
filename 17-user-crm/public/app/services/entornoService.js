angular.module('entornoService', [])

.factory('Entorno', function($http) {

	// create a new object
	var entornoFactory = {};

	// get all entorno
	entornoFactory.all = function() {
		return $http.get('/api/entornos/');

	};
	// get a single entorno
	entornoFactory.get = function(id) {
		return $http.get('/api/entornos/' + id);
	};
	// create a entorno
	entornoFactory.create = function(id, entornoData) {
		return $http.post('/api/entornos/'+id, entornoData);
	};

	// update a entorno
	entornoFactory.update = function(id, entornoData) {
		return $http.put('/api/entornos/' + id, entornoData);
	};

	// delete a entorno
	entornoFactory.delete = function(id) {
		return $http.delete('/api/entornos/' + id);
	};	
	// return our entire entornoFactory object
	return entornoFactory;

});