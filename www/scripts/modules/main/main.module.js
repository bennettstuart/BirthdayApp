(function() {
	'use strict';

	angular
		.module('app.main', [
		])
        .config(function($stateProvider) {
			$stateProvider
				.state('mainState', {
					url: '/main',
					templateUrl: 'scripts/modules/main/main.html',
                    controller: 'mainCtrl as vm'
                })
		});
})();