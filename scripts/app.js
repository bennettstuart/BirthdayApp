angular.module('starter', 
  [
    'ui.bootstrap',
    'ui.router',
    'app.main'
  ])

.config(function($urlRouterProvider) {
	$urlRouterProvider.otherwise('/main');
});

