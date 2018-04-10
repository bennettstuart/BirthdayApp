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
            data: [],
            counter: null
        }

        var asyncDelay = 250

        var defaultData = [
            {
                forname: "John",
                surname: "Doe",
                DOB: "1981-08-02"
            },
            {
                forname: "Katie",
                surname: "Smith",
                DOB: "1973-05-20"
            },
            {
                forname: "Anna",
                surname: "Jackson",
                DOB: "1993-10-15"
            }
        ];

        var init = function() {
            service.counter = 0;
            angular.forEach(defaultData, function(birthday, index){
                //we dont add by async to ensure default data is loaded in before we can get
                service.data.push(
                    {
                        id: service.counter++,
                        forname: birthday.forename,
                        surname: birthday.surname,
                        DOB: birthday.DOB
                    }
                );
            })
            console.log(service.data)
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
                            id: service.counter++,
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
                //delete the birthday.id==id
                var shouldResolve = false
                for(var i=0; i<service.data.length; i++){
                    if(service.data[i].id == id){
                        service.data.slice(i, 1);
                        shouldResolve = true;
                    }
                }
                if(shouldResolve){
                    deferred.resolve();
                } else {
                    deferred.resolve({error:"ID ERROR"});
                }
            }, asyncDelay);
            return deferred.promise
        }

        init()
        return service;
    }
})();