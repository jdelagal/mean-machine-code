angular.module('canalCtrl', ['canalService'])

.controller('canalController', function(Canal) {

	var vm = this;

	// set a processing variable to show loading things
	vm.canalizando = true;

	// grab all the users at page load
	Canal.all()
		.success(function(data) {

			// when all the users come back, remove the processing variable
			vm.canalizando = false;

			// bind the entregables that come back to vm.entregables
			vm.canales = data;
		});

	// function to delete a canal
	vm.deleteCanal = function(id) {
		vm.canalizando = true;

		Canal.delete(id)
			.success(function(data) {

				// get all users to update the table
				// you can also set up your api 
				// to return the list of catalogos with the delete call
				Canal.all()
					.success(function(data) {
						// when all the users come back, remove the processing variable
						vm.canalizando = false;

						// bind the entregables that come back to vm.entregables
						vm.canales = data;
					});
		});
	};		
})

.controller('canalConsumidorCreateController', function($routeParams, Canal) {

	var vm = this;

	// variable to hide/show elements of the view
	// differentiates between create or edit pages
	vm.type = 'create';

	// function to create a user
	vm.saveCanal = function() {
		vm.canalizando = true;
		vm.message = '';
		// use the create function in the canalService
		Canal.create($routeParams.consumidor_id, vm.canalData)
			.success(function(data) {
				vm.canalizando = false;
				vm.canalData = {};
				vm.message = data.message;
			});
	};	
})

// controller applied to canal edit page
.controller('canalEditController', function($location,$routeParams, Canal) {

	var vm = this;

	// variable to hide/show elements of the view
	// differentiates between create or edit pages
	vm.type = 'edit';

	// get the catalogo data for the user you want to edit
	// $routeParams is the way we grab data from the URL
	Canal.get($routeParams.canal_id)
		.success(function(data) {
			vm.canalData = data;
		});

	// function to save the canal
	vm.saveCanal = function() {
		vm.entregando = true;
		vm.message = '';

		// call the canalService function to update 
		Canal.update($routeParams.canal_id, vm.canalData)
			.success(function(data) {
				vm.canalizando = false;

				// clear the form
				vm.canalData = {};

				// bind the message from our API to vm.message
				vm.message = data.message;
				$location.path('/canales');
			});
	};
});