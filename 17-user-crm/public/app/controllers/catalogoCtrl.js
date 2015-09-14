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

});
