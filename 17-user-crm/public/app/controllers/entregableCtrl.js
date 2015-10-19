angular.module('entregableCtrl', ['entregableService','ngTable'])

.controller('entregableController', function(Entregable,$rootScope,ngTableParams) {

	var vm = this;

	// set a processing variable to show loading things
	vm.entregando = true;

	var params = {
		page: 1,
	    count: 9
	}
	// grab all the users at page load
	Entregable.all()
		.success(function(data) {
			// when all the users come back, remove the processing variable
			vm.entregando = false;
			// bind the catalogos that come back to vm.catalogos
			//este data es diferente del data de la paginacion
			//por ello se descarga en vm.catalogos pues entra
			//en contexto el otro data, $data del paginado
			vm.entregables = data;
			var settings = {
	            total: vm.entregables.length, // resultados en total,
	            counts: [10, 1000, 10000],
	            getData: function($defer, params) {
	        	    $defer.resolve(vm.entregables.slice((params.page() - 1) * params.count(), params.page() * params.count()));
	            }
	        };		
	        $rootScope.tableParams = new ngTableParams(params,settings);
		});

	// function to delete a entregable
	vm.deleteEntregable = function(id) {
		vm.evaluando = true;

		Entregable.delete(id)
			.success(function(data) {

				// get all users to update the table
				// you can also set up your api 
				// to return the list of catalogos with the delete call
				Entregable.all()
					.success(function(data) {
						// when all the users come back, remove the processing variable
						vm.entregando = false;

						// bind the entregables that come back to vm.entregables
						vm.entregables = data;
					});
		});
	};		
})

.controller('entregableCatalogoCreateController', function($routeParams, Entregable) {

	var vm = this;

	// variable to hide/show elements of the view
	// differentiates between create or edit pages
	vm.type = 'create';

	// function to create a user
	vm.saveEntregable = function() {
		vm.entregando = true;
		vm.message = '';
		// use the create function in the entregableService
		Entregable.create($routeParams.catalogo_id, vm.entregableData)
			.success(function(data) {
				vm.entregando = false;
				vm.entregableData = {};
				vm.message = data.message;
			});
	};	
})


// controller applied to entregable edit page
.controller('entregableEditController', function($location,$routeParams, Entregable) {

	var vm = this;

	// variable to hide/show elements of the view
	// differentiates between create or edit pages
	vm.type = 'edit';

	// get the catalogo data for the user you want to edit
	// $routeParams is the way we grab data from the URL
	Entregable.get($routeParams.entregable_id)
		.success(function(data) {
			vm.entregableData = data;
		});

	// function to save the catalogo
	vm.saveEntregable = function() {
		vm.entregando = true;
		vm.message = '';

		// call the entregableService function to update 
		Entregable.update($routeParams.entregable_id, vm.entregableData)
			.success(function(data) {
				vm.entregando = false;

				// clear the form
				vm.entregableData = {};

				// bind the message from our API to vm.message
				vm.message = data.message;
				$location.path('/entregables');
			});
	};
});