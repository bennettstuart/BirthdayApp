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

        var asyncDelay = 50;

        var defaultData = [
            {
                forename: "John",
                surname: "Doe",
                DOB: "1981-08-02"
            },
            {
                forename: "Katie",
                surname: "Smith",
                DOB: "1973-05-20"
            },
            {
                forename: "Anna",
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
                        forename: birthday.forename,
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
                }else if(!birthday.hasOwnProperty('forename')){
                    deferred.reject({error:"forename MISSING"});
                }else{
                    service.data.push(
                        {
                            id: service.counter++,
                            forename: birthday.forename,
                            surname: birthday.surname,
                            DOB: formatDate(birthday.DOB)
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
                        service.data.splice(i, 1);
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

        function formatDate(date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();
        
            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;
        
            return [year, month, day].join('-');
        }

        init()
        return service;
    }
})();