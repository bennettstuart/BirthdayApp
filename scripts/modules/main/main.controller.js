(function () {
    'use strict';

    angular
        .module('app.main')
        .controller('mainCtrl', mainCtrl);

    mainCtrl.$inject = [
        '$state',
        'dataSrvc'

    ];
    
    function mainCtrl(
        $state,
        dataSrvc
    ) {
        var vm = angular.extend(this, { });

        var init = function() {
            vm.birthdays = [];
            getBirthdays();
        }

        var getBirthdays = function() {
            dataSrvc.getData().then(
            function(response){ //success
                console.log(response.data);
            },
            function(err){ //error
                console.log(err)
            })
        }


        init();
    }
})();