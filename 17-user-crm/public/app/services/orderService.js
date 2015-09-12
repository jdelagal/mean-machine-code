angular.module('orderService', [])

.factory('Order', function($http) {

	// create a new object
	var orderFactory = {};


	// get all users
	orderFactory.all = function() {
		return $http.get('/api/orders/');
	};


	// return our entire userFactory object
	return orderFactory;

});
