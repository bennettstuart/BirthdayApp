(function () {
    'use strict';

    angular
        .module('app.main')
        .controller('mainCtrl', mainCtrl);

    mainCtrl.$inject = [
        '$state'
    ];
    
    function mainCtrl(
        $state
    ) {
        var vm = angular.extend(this, {});


        
    }
})();