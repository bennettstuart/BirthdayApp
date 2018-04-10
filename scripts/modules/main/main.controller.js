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
        
        vm.newBirthday = function(parentSelector){
            vm.modalLocked = false

            vm.tempBirthday = {
                forename: "",
                surname: "",
                DOB: new Date(),
            }

            var parentElem = parentSelector ? 
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            vm.modalInstance = $uibModal.open({
                animation: vm.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                //templateUrl: './scripts/modules/main/newBirthdayModal.html',
                template: `
                <div class="modal-header">
                    <h3 class="modal-title" id="modal-title">Track a new Birthday!</h3>
                </div>
                <div class="modal-body" id="modal-body">
                    <form>
                        First name: <input ng-disabled="vm.modalLocked" ng-model="vm.tempBirthday.forename" type="text" name="fname" required><br>
                        Last name: <input ng-disabled="vm.modalLocked" ng-model="vm.tempBirthday.surname" type="text" name="lname"><br>
                        DOB: <input ng-disabled="vm.modalLocked" ng-model="vm.tempBirthday.DOB" type="date" name="dob" required><br>
                    </form>
                </div>
                <div class="modal-footer">
                    <button ng-disabled="vm.modalLocked" class="btn btn-primary" type="button" ng-click="vm.addBirthday()">OK</button>
                    <button ng-disabled="vm.modalLocked" class="btn btn-warning" type="button" ng-click="vm.modalInstance.close()">Cancel</button>
                </div>
                `,
                scope: $scope,
                appendTo: parentElem,
                resolve: {
                    items: function () {
                    return vm.items;
                    }
                }
            });

        }

        vm.addBirthday = function() {
            vm.modalLocked = true
            dataSrvc.postBirthday(vm.tempBirthday).then(function(response){
                console.log("Birthday ADDED!");
                vetBirthdaysLocally(response.data);
                vm.modalLocked = false
                vm.modalInstance.close();
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