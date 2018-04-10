angular.module('starter', 
  [
    'ui.bootstrap',
    'ui.router',
    'app.main',
    'singletons'
  ])

.config(function($urlRouterProvider) {
	$urlRouterProvider.otherwise('/main');
});

