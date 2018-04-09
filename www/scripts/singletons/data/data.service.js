(function() {
    'use strict';
    angular
    .module('singletons', [
    ])
    .service('dataSrvc', dataSrvc);

    dataSrvc.$inject = [
        '$http',
        '$q',
        '$timeout'
    ];

    function dataSrvc(
        $http,
        $q,
        $timeout
    ) {
        var service = {
            data: []
        }

        var defaultData = [
            {
                "name": "John Doe",
                "birthday": "1981-08-02"
            },
            {
                "name": "Katie Smith",
                "birthday": "1973-05-20"
            },
            {
                "name": "Anna Jackson",
                "birthday": "1993-10-15"
            }
        ];

        var init = function() {
            service.data = defaultData;
        }

        service.getData = function() {
            //asyncfn
            var deferred = $q.defer();

            $timeout(function() {

            }, 250);

            return deferred.promise
        }

        init()
        return service;
    }
})();