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

        var asyncDelay = 250

        var defaultData = [
            {
                id: 0,
                forname: "John",
                surname: "Doe",
                DOB: "1981-08-02"
            },
            {
                id: 1,
                forname: "Katie",
                surname: "Smith",
                DOB: "1973-05-20"
            },
            {
                id: 2,
                forname: "Anna",
                surname: "Jackson",
                DOB: "1993-10-15"
            }
        ];

        var init = function() {
            service.data = defaultData;
        }

        service.getData = function() {
            var deferred = $q.defer();
            $timeout(function() { //timeout to emulate async
                var response = {
                    data: service.data
                };

                deferred.resolve(response)
            }, asyncDelay);
            return deferred.promise
        }

        service.postBirthday = function(birthday){
            var deferred = $q.defer()
            $timeout(function() { //timeout to emulate async
                if(!birthday.hasOwnProperty('DOB')){
                    deferred.reject({error:"DOB MISSING"});
                }else if(!birthday.hasOwnProperty('forname')){
                    deferred.reject({error:"forname MISSING"});
                }else{
                    service.data.push(
                        {
                            id: service.data.length,
                            forname: birthday.forename,
                            surname: birthday.surname,
                            DOB: birthday.DOB
                        }
                    );

                    //return the last added
                    var response = {
                        data: service.data[service.data.length -1]
                    }
                    return deferred.resolve(response) 
                } 
            }, asyncDelay);
            return deferred.promise
        }

        service.deleteBirthday = function(id){
            var deferred = $q.defer()
            $timeout(function() { //timeout to emulate async
                if((id < 0)||(id >= service.data.length)){
                    deferred.reject({error:"ID ERROR"});
                }else{
                    service.data.slice(id, 1)
                } 
            }, asyncDelay);
            return deferred.promise
        }

        init()
        return service;
    }
})();