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
});
