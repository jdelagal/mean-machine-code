angular.module('entregableCtrl', ['entregableService'])

.controller('entregableController', function(Entregable) {

	var vm = this;

	// set a processing variable to show loading things
	vm.entregando = true;

	// grab all the users at page load
	Entregable.all()
		.success(function(data) {

			// when all the users come back, remove the processing variable
			vm.entregando = false;

			// bind the entregables that come back to vm.entregables
			vm.entregables = data;
		});
})

// controller applied to user creation page
.controller('entregableCreateController', function(Entregable) {
	
	var vm = this;

	// variable to hide/show elements of the view
	// differentiates between create or edit pages
	vm.type = 'create';

	// function to create a user
	vm.saveEntregable = function() {
		vm.entregando = true;
		vm.message = '';
		// use the create function in the entregableService
		Entregable.create(vm.entregableData)
			.success(function(data) {
				vm.entregando = false;
				vm.entregableData = {};
				vm.message = data.message;
			});
			
	};	

});