angular.module('entornoCtrl', ['entornoService','ngTable'])

.controller('entornoController', function(Entorno,$rootScope,ngTableParams) {

	var vm = this;

	// set a processing variable to show loading things
	vm.desplegando = true;

	var params = {
		page: 1,
	    count: 9
	}
	// grab all the users at page load
	Entorno.all()
		.success(function(data) {

			// when all the users come back, remove the processing variable
			vm.desplegando = false;

			vm.entornos = data;
			var settings = {
	            total: vm.entornos.length, // resultados en total,
	            counts: [10, 1000, 10000],
	            getData: function($defer, params) {
	        	    $defer.resolve(vm.entornos.slice((params.page() - 1) * params.count(), params.page() * params.count()));
	            }
	        };		
	        $rootScope.tableParams = new ngTableParams(params,settings);
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

						vm.entornos = data;
						var settings = {
				            total: vm.entornos.length, // resultados en total,
				            counts: [10, 1000, 10000],
				            getData: function($defer, params) {
				        	    $defer.resolve(vm.entornos.slice((params.page() - 1) * params.count(), params.page() * params.count()));
				            }
				        };		
				        $rootScope.tableParams = new ngTableParams(params,settings);
					});
		});
	};		
})

.controller('entornoBuscarController', function(Entorno,$rootScope,ngTableParams,$routeParams) {

	var vm = this;

	// set a processing variable to show loading things
	vm.desplegando = true;

	var params = {
		page: 1,
	    count: 9
	}
	// grab all the entregable at page load
	Entorno.allBuscar($routeParams.entregable_id)
		.success(function(data) {
			// when all the users come back, remove the processing variable
			vm.desplegando = false;
			// bind the catalogos that come back to vm.catalogos
			//este data es diferente del data de la paginacion
			//por ello se descarga en vm.catalogos pues entra
			//en contexto el otro data, $data del paginado
			vm.entornos = data;
			var settings = {
	            total: vm.entornos.length, // resultados en total,
	            counts: [10, 1000, 10000],
	            getData: function($defer, params) {
	        	    $defer.resolve(vm.entornos.slice((params.page() - 1) * params.count(), params.page() * params.count()));
	            }
	        };		
	        $rootScope.tableParams = new ngTableParams(params,settings);
		});
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