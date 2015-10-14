angular.module('consumidorCtrl', ['consumidorService'])

.controller('consumidorController', function(Consumidor) {

	var vm = this;

	// set a processing variable to show loading things
	vm.consumiendo = true;

	// grab all the users at page load
	Consumidor.all()
		.success(function(data) {

			// when all the users come back, remove the processing variable
			vm.consumiendo = false;

			// bind the entregables that come back to vm.entregables
			vm.consumidores = data;
		});

	// function to delete a consumidor
	vm.deleteConsumidor = function(id) {
		vm.consumiendo = true;

		Consumidor.delete(id)
			.success(function(data) {

				// get all users to update the table
				// you can also set up your api 
				// to return the list of catalogos with the delete call
				Consumidor.all()
					.success(function(data) {
						// when all the users come back, remove the processing variable
						vm.consumiendo = false;

						// bind the entregables that come back to vm.entregables
						vm.consumidores = data;
					});
		});
	};		
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
		Consumidor.update($routeParams.consumidor_id, vm.entregableData)
			.success(function(data) {
				vm.entregando = false;

				// clear the form
				vm.entregableData = {};

				// bind the message from our API to vm.message
				vm.message = data.message;
				$location.path('/consumidores');
			});
	};
});