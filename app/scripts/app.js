(function() {
	function config($stateProvider, $locationProvider) {
		$locationProvider
			.html5Mode({
				enabled: true,
				requireBase: false
		});

		$stateProvider
		.state('active', {
			url: '/active',
			controller: 'ActiveCtrl',
			controllerAs: 'active',
			templateUrl: '/templates/active.html'
		})

		.state('inactive', {
			url: '/inactive',
			controller: 'InactiveCtrl',
			controllerAs: 'inactive',
			templateUrl: '/templates/inactive.html'
		});
	}

	angular
		.module('blocitoff', ['ui.router', 'firebase'])
		.config(config);

})();