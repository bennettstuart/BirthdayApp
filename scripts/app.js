angular.module('starter', 
  [
    'ui.bootstrap',
    'ui.router',
    'app.main',
    'singletons'
  ])
  .filter('nthbirthday', function() {
    return function(DOB) {
        var fromYear = (DOB.split("-"))[0];
        var n = (new Date()).getFullYear() - parseInt(fromYear);
        var m = "";

        switch(n % 10){
          case 1:
            m = "st"
            break
          case 2:
            m = "nd"
            break
          case 3:
            m = "rd"
            break
          default:
            m = "th"
          break
        }

        return n+m+" birthday!";
    };
  })
.config(function($urlRouterProvider) {
	$urlRouterProvider.otherwise('/main');
});

