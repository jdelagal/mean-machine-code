angular.module('entornoCtrl', ['entornoService'])

.controller('entornoController', function(Entorno) {

	var vm = this;

	// set a processing variable to show loading things
	vm.desplegando = true;

	// grab all the users at page load
	Entorno.all()
		.success(function(data) {

			// when all the users come back, remove the processing variable
			vm.desplegando = false;

			// bind the entregables that come back to vm.entregables
			vm.entornos = data;
		});

	// function to delete a entorno
	vm.deleteEntorno = function(id) {
		vm.desplegando = true;

		Entorno.delete(id)
			.success(function(data) {

				// get all users to update the table
				// you can also set up your api 
				// to return the list of entornos with the delete call
				Entorno.all()
					.success(function(data) {
						// when all the users come back, remove the processing variable
						vm.desplegando = false;

						// bind the entornos that come back to vm.entornos
						vm.entornos = data;
					});
		});
	};		
})

.controller('entornoEntregableCreateController', function($routeParams, Entorno) {

	var vm = this;

	// variable to hide/show elements of the view
	// differentiates between create or edit pages
	vm.type = 'create';

	// function to create a entorno
	vm.saveEntorno = function() {
		vm.desplegando = true;
		vm.message = '';
		// use the create function in the entornoService
		Entorno.create($routeParams.entregable_id, vm.entornoData)
			.success(function(data) {
				vm.desplegando = false;
				vm.entornoData = {};
				vm.message = data.message;
			});
	};	
})


// controller applied to entorno edit page
.controller('entornoEditController', function($location,$routeParams, Entorno) {

	var vm = this;

	// variable to hide/show elements of the view
	// differentiates between create or edit pages
	vm.type = 'edit';

	// get the catalogo data for the user you want to edit
	// $routeParams is the way we grab data from the URL
	Entorno.get($routeParams.entorno_id)
		.success(function(data) {
			vm.entornoData = data;
		});

	// function to save the entorno
	vm.saveEntorno = function() {
		vm.desplegando = true;
		vm.message = '';

		// call the entornoService function to update 
		Entorno.update($routeParams.entorno_id, vm.entornoData)
			.success(function(data) {
				vm.desplegando = false;

				// clear the form
				vm.entornoData = {};

				// bind the message from our API to vm.message
				vm.message = data.message;
				$location.path('/entornos');
			});
	};
});