angular.module('usuarioCtrl', ['usuarioService'])

.controller('usuarioController', function(Usuario) {

	var vm = this;

	// set a processing variable to show loading things
	vm.processing = true;

	// grab all the users at page load
	Usuario.all()
		.success(function(data) {

			// when all the users come back, remove the processing variable
			vm.processing = false;

			// bind the users that come back to vm.users
			vm.usuarios = data;
		});

	// function to delete a user
	vm.deleteUsuario = function(id) {
		vm.processing = true;

		Usuario.delete(id)
			.success(function(data) {

				// get all users to update the table
				// you can also set up your api 
				// to return the list of users with the delete call
				Usuario.all()
					.success(function(data) {
						vm.processing = false;
						vm.usuarios = data;
					});

			});
	};

})

// controller applied to user creation page
.controller('usuarioCreateController', function(Usuario) {
	
	var vm = this;

	// variable to hide/show elements of the view
	// differentiates between create or edit pages
	vm.type = 'create';

	// function to create a user
	vm.saveUsuario = function() {
		vm.processing = true;
		vm.message = '';

		// use the create function in the userService
		Usuario.create(vm.usuarioData)
			.success(function(data) {
				vm.processing = false;
				vm.usuarioData = {};
				vm.message = data.message;
			});
			
	};	

})

// controller applied to user edit page
.controller('usuarioEditController', function($routeParams, Usuario) {

	var vm = this;

	// variable to hide/show elements of the view
	// differentiates between create or edit pages
	vm.type = 'edit';

	// get the user data for the user you want to edit
	// $routeParams is the way we grab data from the URL
	Usuario.get($routeParams.usuario_id)
		.success(function(data) {
			vm.usuarioData = data;
		});

	// function to save the user
	vm.saveUsuario = function() {
		vm.processing = true;
		vm.message = '';

		// call the userService function to update 
		Usuario.update($routeParams.usuario_id, vm.usuarioData)
			.success(function(data) {
				vm.processing = false;

				// clear the form
				vm.usuarioData = {};

				// bind the message from our API to vm.message
				vm.message = data.message;
			});
	};

});