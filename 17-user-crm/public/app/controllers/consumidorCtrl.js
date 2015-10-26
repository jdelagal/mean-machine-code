angular.module('consumidorCtrl', ['consumidorService','ngTable'])

.controller('consumidorController', function(Consumidor,$rootScope,ngTableParams) {

	var vm = this;

	// set a processing variable to show loading things
	vm.consumiendo = true;

	var params = {
		page: 1,
	    count: 9
	}
	// grab all the users at page load
	Consumidor.all()
		.success(function(data) {

			// when all the users come back, remove the processing variable
			vm.consumiendo = false;

			vm.consumidores = data;
			var settings = {
	            total: vm.consumidores.length, // resultados en total,
	            counts: [10, 1000, 10000],
	            getData: function($defer, params) {
	        	    $defer.resolve(vm.consumidores.slice((params.page() - 1) * params.count(), params.page() * params.count()));
	            }
	        };		
	        $rootScope.tableParams = new ngTableParams(params,settings);
		});

	// function to delete a consumidor
	vm.deleteConsumidor = function(id) {
		vm.consumiendo = true;

		Consumidor.delete(id)
			.success(function(data) {

				// get all users to update the table
				// you can also set up your api 
				// to return the list of catalogos with the delete call
				// grab all the users at page load
				Consumidor.all()
					.success(function(data) {

						// when all the users come back, remove the processing variable
						vm.consumiendo = false;

						vm.consumidores = data;
						var settings = {
				            total: vm.consumidores.length, // resultados en total,
				            counts: [10, 1000, 10000],
				            getData: function($defer, params) {
				        	    $defer.resolve(vm.consumidores.slice((params.page() - 1) * params.count(), params.page() * params.count()));
				            }
				        };		
				        $rootScope.tableParams = new ngTableParams(params,settings);
					});
		});
	};		
})

.controller('consumidorBuscarController', function(Consumidor,$rootScope,ngTableParams,$routeParams) {

	var vm = this;

	// set a processing variable to show loading things
	vm.consumiendo = true;

	var params = {
		page: 1,
	    count: 9
	}
	// grab all the users at page load
	Consumidor.allBuscar($routeParams.catalogo_id)
		.success(function(data) {

			// when all the users come back, remove the processing variable
			vm.consumiendo = false;

			vm.consumidores = data;
			var settings = {
	            total: vm.consumidores.length, // resultados en total,
	            counts: [10, 1000, 10000],
	            getData: function($defer, params) {
	        	    $defer.resolve(vm.consumidores.slice((params.page() - 1) * params.count(), params.page() * params.count()));
	            }
	        };		
	        $rootScope.tableParams = new ngTableParams(params,settings);
		});
})
.controller('consumidorCatalogoCreateController', function($routeParams, Consumidor) {

	var vm = this;

	// variable to hide/show elements of the view
	// differentiates between create or edit pages
	vm.type = 'create';

	// function to create a user
	vm.saveConsumidor = function() {
		vm.consumiendo = true;
		vm.message = '';
		// use the create function in the entregableService
		Consumidor.create($routeParams.catalogo_id, vm.consumidorData)
			.success(function(data) {
				vm.consumiendo = false;
				vm.consumidorData = {};
				vm.message = data.message;
			});
	};	
})


// controller applied to entregable edit page
.controller('consumidorEditController', function($location,$routeParams, Consumidor) {

	var vm = this;

	// variable to hide/show elements of the view
	// differentiates between create or edit pages
	vm.type = 'edit';

	// get the catalogo data for the user you want to edit
	// $routeParams is the way we grab data from the URL
	Consumidor.get($routeParams.consumidor_id)
		.success(function(data) {
			vm.consumidorData = data;
		});

	// function to save the consumidor
	vm.saveConsumidor = function() {
		vm.consumiendo = true;
		vm.message = '';

		// call the entregableService function to update 
		Consumidor.update($routeParams.consumidor_id, vm.consumidorData)
			.success(function(data) {
				vm.entregando = false;

				// clear the form
				vm.consumidorData = {};

				// bind the message from our API to vm.message
				vm.message = data.message;
				$location.path('/consumidores');
			});
	};
});