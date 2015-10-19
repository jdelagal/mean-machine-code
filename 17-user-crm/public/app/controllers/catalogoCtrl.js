angular.module('catalogoCtrl', ['catalogoService','ngTable'])

.controller('catalogoController', function(Catalogo,$rootScope,ngTableParams) {

	var vm = this;

	// set a processing variable to show loading things
	vm.evaluando = true;
	var params = {
		page: 1,
	    count: 9
	}
	// grab all the users at page load
	Catalogo.all()
		.success(function(data) {

			// when all the users come back, remove the processing variable
			vm.evaluando = false;

			// bind the catalogos that come back to vm.catalogos
			//este data es diferente del data de la paginacion
			//por ello se descarga en vm.catalogos pues entra
			//en contexto el otro data, $data del paginado
			vm.catalogos = data;
			var todos =vm.catalogos.size;
			var settings = {
	            total: vm.catalogos.length, // resultados en total,
	            counts: [10, 100, 1000],
	            getData: function($defer, params) {
	        	    $defer.resolve(vm.catalogos.slice((params.page() - 1) * params.count(), params.page() * params.count()));
	            }
	        };		
	        $rootScope.tableParams = new ngTableParams(params,settings);
	})

	// function to delete a user
	vm.deleteCatalogo = function(id) {
		vm.evaluando = true;

		Catalogo.delete(id)
			.success(function(data) {

				// get all users to update the table
				// you can also set up your api 
				// to return the list of catalogos with the delete call
				Catalogo.all()
					.success(function(data) {
						// when all the users come back, remove the processing variable
						vm.evaluando = false;

						// bind the catalogos that come back to vm.catalogos
						//este data es diferente del data de la paginacion
						//por ello se descarga en vm.catalogos pues entra
						//en contexto el otro data, $data del paginado
						vm.catalogos = data;
						var settings = {
				            total: vm.catalogos.length, // resultados en total,
				            counts: [5, 10, 15],
				            getData: function($defer, params) {
				        	    $defer.resolve(vm.catalogos.slice((params.page() - 1) * params.count(), params.page() * params.count()));
				            }
				        };		
				        $rootScope.tableParams = new ngTableParams(params,settings);
					});
		});
	};
})

// controller applied to user creation page
.controller('catalogoCreateController', function(Catalogo) {
	
	var vm = this;

	// variable to hide/show elements of the view
	// differentiates between create or edit pages
	vm.type = 'create';

	// function to create a user
	vm.saveCatalogo = function() {
		vm.evaluando = true;
		vm.message = '';
		// use the create function in the catalogoService
		Catalogo.create(vm.catalogoData)
			.success(function(data) {
				vm.evaluando = false;
				vm.catalogoData = {};
				vm.message = data.message;
			});
			
	};	

})


// controller applied to catalogo edit page
.controller('catalogoEditController', function($location,$routeParams, Catalogo) {

	var vm = this;

	// variable to hide/show elements of the view
	// differentiates between create or edit pages
	vm.type = 'edit';

	// get the catalogo data for the user you want to edit
	// $routeParams is the way we grab data from the URL
	Catalogo.get($routeParams.catalogo_id)
		.success(function(data) {
			vm.catalogoData = data;
		});

	// function to save the catalogo
	vm.saveCatalogo = function() {
		vm.evaluando = true;
		vm.message = '';

		// call the catalogoService function to update 
		Catalogo.update($routeParams.catalogo_id, vm.catalogoData)
			.success(function(data) {
				vm.evaluando = false;

				// clear the form
				vm.catalogoData = {};

				// bind the message from our API to vm.message
				vm.message = data.message;
				$location.path('/catalogos');
			});
	};
});