(function () {
    'use strict';

    angular
        .module('app.main')
        .controller('mainCtrl', mainCtrl);

    mainCtrl.$inject = [
        '$state',
        '$scope',
        'dataSrvc',
        '$q',
        '$uibModal',
    ];
    
    function mainCtrl(
        $state,
        $scope,
        dataSrvc,
        $q,
        $uibModal
    ) {
        var vm = angular.extend(this, {
            initialised: false,
            filter: ""
        });

        var init = function() {
            vm.initialised = false;
            vm.birthdays = [];
            getBirthdays().then(function(response){
                vm.initialised = true; 
                angular.forEach(response.data, function(birthday){
                    vetBirthdaysLocally(birthday)
                    console.log(isWithinXDaysFromNow(birthday))
                })
            });
        }

        var vetBirthdaysLocally = function(birthdayObj){
            //looks at birthdays coming in and evaluates them accordingly
            var vettedBirthday = {
                id: birthdayObj.id,
                forename: birthdayObj.forename,
                surname: birthdayObj.surname,
                DOB: birthdayObj.DOB,
                isToday: isWithinXDaysFromNow(birthdayObj, 0),
                isSoon: isWithinXDaysFromNow(birthdayObj, 14)
            }

            vm.birthdays.push(vettedBirthday);
        }

        var getBirthdays = function() {
            var deferred = $q.defer();
            dataSrvc.getData().then(
            function(response){ //success
                //console.log(response.data);
                deferred.resolve(response)
            },
            function(err){ //error
                console.log(err)
                deferred.reject()
            })
            return deferred.promise
        }

        var birthday = {
            forename: "nigel",
            DOB: "2015-04-10"
        }
        
        vm.tempBirthday = {
            forename: "",
            surname: "",
            DOB: new Date(),
        }
        vm.newBirthday = function(parentSelector){

            var parentElem = parentSelector ? 
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
                animation: vm.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'scripts/modules/main/newBirthdayModal.html',
                scope: $scope,
                appendTo: parentElem,
                resolve: {
                    items: function () {
                    return vm.items;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                vm.selected = selectedItem;
            }, function () {
            
            });
        }

        vm.addBirthday = function() {
            dataSrvc.postBirthday(vm.tempBirthday).then(function(response){
                console.log("Birthday ADDED!");
                vetBirthdaysLocally(response.data);
            });
        }

        vm.deleteBirthday = function(id){
            dataSrvc.deleteBirthday(id).then(function(){
                //it was delete on the _"backend"_, now remove our handle of it
                for(var i=0; i < vm.birthdays.length; i++){
                    if(vm.birthdays[i].id == id){
                        vm.birthdays.splice(i, 1);
                        break;
                    }
                }
            },
            function(err){
                window.alert(err.error)
            })
        }

        var isWithinXDaysFromNow = function(birthdayObj, X){
            var now = new Date();
            var then = new Date(birthdayObj.DOB);
            
            then.setFullYear(2018);

            var timeDiff = Math.abs(then.getTime() - now.getTime());
            var diffDays = Math.floor(timeDiff / (1000 * 3600 * 24)); 
            
            return (diffDays <= X)
        }

        init();
    }
})();