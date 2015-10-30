angular.module('consumidorService', [])

.factory('Consumidor', function($http) {

	// create a new object
	var consumidorFactory = {};

	// get all consumidores
	consumidorFactory.all = function() {
		return $http.get('/api/consumidores/');

	};
	// get a single consumidor
	consumidorFactory.get = function(id) {
		return $http.get('/api/consumidores/' + id);
	};
	// create a consumidor
	consumidorFactory.create = function(id, consumidorData) {
		return $http.post('/api/a_consumidores/'+id, consumidorData);
	};

		// update a consumidor
	consumidorFactory.update = function(id, consumidorData) {
		return $http.put('/api/consumidores/' + id, consumidorData);
	};

	// delete a consumidor
	consumidorFactory.delete = function(id) {
		return $http.delete('/api/consumidores/' + id);
	};

	// get all consumidores filtrados
	consumidorFactory.allBuscar = function(id) {
		return $http.get('/api/b_consumidores/'+ id);

	};	
	// return our entire consumidorFactory object
	return consumidorFactory;

});