angular.module('mainCtrl', [])

.controller('mainController', function($rootScope, $location, Auth) {

	var vm = this;

	// get info if a person is logged in
	vm.loggedIn = Auth.isLoggedIn();

	// check to see if a user is logged in on every request
	$rootScope.$on('$routeChangeStart', function() {
		vm.loggedIn = Auth.isLoggedIn();

		// get user information on page load
		Auth.getUser()
			.then(function(data) {
				vm.user = data.data;
			});
	});

	// function to handle login form
	vm.doLogin = function() {
		vm.processing = true;

		// clear the error
		vm.error = '';

		Auth.login(vm.loginData.username, vm.loginData.password)
			.success(function(data) {
				vm.processing = false;

				// if a user successfully logs in, redirect to users page
				if (data.success)
					$location.path('/catalogos');
				else
					vm.error = data.message;
				
			});
	};

	// function to handle logging out
	vm.doLogout = function() {
		Auth.logout();
		vm.user = '';

		$location.path('/login');
	};

	vm.createSample = function() {
		Auth.createSampleUser();
	};

	vm.volverCatalogoList = function() {
		$location.path('/catalogos');
	};

	vm.volverEntregableList = function() {
		$location.path('/entregables');
	};	
})

.directive("formatDate", function(){
  return {
   require: 'ngModel',
    link: function(scope, elem, attr, modelCtrl) {
      modelCtrl.$formatters.push(function(modelValue){
        return new Date(modelValue);
      })
    }
  }
});
