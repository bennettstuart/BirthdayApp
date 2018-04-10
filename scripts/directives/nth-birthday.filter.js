angular.module('NthBirthdayFilter', [])
filter('nthbirthday', function() {
    return function(DOB, thisYear) {
        var out = '';
        for (var i = 0; i < input.length; i++) {
            out = input.charAt(i) + out;
        }
        // conditional based on optional argument
        if (uppercase) {
            out = out.toUpperCase();
        }
        return out;
    };
  })