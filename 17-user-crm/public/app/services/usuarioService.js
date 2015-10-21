angular.module('usuarioService', [])

.factory('Usuario', function($http) {

	// create a new object
	var usuarioFactory = {};

	// get a single user
	usuarioFactory.get = function(id) {
		return $http.get('/api/usuarios/' + id);
	};

	// get all users
	usuarioFactory.all = function() {
		return $http.get('/api/usuarios/');
	};

	// create a user
	usuarioFactory.create = function(userData) {
		return $http.post('/api/usuarios/', userData);
	};

	// update a user
	usuarioFactory.update = function(id, userData) {
		return $http.put('/api/usuarios/' + id, userData);
	};

	// delete a user
	usuarioFactory.delete = function(id) {
		return $http.delete('/api/usuarios/' + id);
	};

	// return our entire userFactory object
	return usuarioFactory;

});