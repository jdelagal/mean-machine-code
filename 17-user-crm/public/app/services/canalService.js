angular.module('canalService', [])

.factory('Canal', function($http) {

	// create a new object
	var canalFactory = {};

	// get all canales
	canalFactory.all = function() {
		return $http.get('/api/canales/');

	};
	// get a single canal
	canalFactory.get = function(id) {
		return $http.get('/api/canales/' + id);
	};
	// create a canal
	canalFactory.create = function(id, canalData) {
		return $http.post('/api/canales/'+id, canalData);
	};

		// update a canal
	canalFactory.update = function(id, canalData) {
		return $http.put('/api/canales/' + id, canalData);
	};

	// delete a canal
	canalFactory.delete = function(id) {
		return $http.delete('/api/canales/' + id);
	};	

	// get all canales
	canalFactory.allBuscar = function(id) {
		return $http.get('/api/b_canales/'+id);

	};
	// g	
	// return our entire canalFactory object
	return canalFactory;

});