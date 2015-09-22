angular.module('entregableService', [])

.factory('Entregable', function($http) {

	// create a new object
	var entregableFactory = {};

	// get all entregables
	entregableFactory.all = function() {
		return $http.get('/api/entregables/');

	};

	// create a entregables
	entregableFactory.create = function(entregableData) {
		return $http.post('/api/entregables/', entregableData);
	};
	// return our entire entragableFactory object
	return entregableFactory;

});