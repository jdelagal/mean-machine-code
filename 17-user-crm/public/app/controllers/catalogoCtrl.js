angular.module('catalogoCtrl', ['catalogoService'])

.controller('catalogoController', function(Catalogo) {

	var vm = this;

	// set a processing variable to show loading things
	vm.evaluando = true;

	// grab all the users at page load
	Catalogo.all()
		.success(function(data) {

			// when all the users come back, remove the processing variable
			vm.evaluando = false;

			// bind the users that come back to vm.users
			vm.catalogos = data;
		});
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
						vm.evaluando = false;
						vm.catalogos = data;
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