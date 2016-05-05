(function() {
    var modalService = function($uibModal) {

        this.showModal = function (customModalDefaults, customModalOptions) {
            if (!customModalDefaults) customModalDefaults = {};
            customModalDefaults.backdrop = 'static';
            return this.show(customModalDefaults, customModalOptions);
        };

        this.show = function (customModalDefaults, customModalOptions) {
            //Create temp objects to work with since we're in a singleton service
            var tempModalDefaults = {};
            var tempModalOptions = {};

            //Map angular-ui modal custom defaults to modal defaults defined in service
            angular.extend(tempModalDefaults, customModalDefaults);

            //Map modal.html $scope custom properties to defaults defined in service
            angular.extend(tempModalOptions, customModalOptions);

            if (!tempModalDefaults.controller) {
                tempModalDefaults.controller = function ($scope, $uibModalInstance) {
                    $scope.modalOptions = tempModalOptions;
                    $scope.modalOptions.ok = function (result) {
                        $uibModalInstance.close($scope.modalOptions.np);
                    };
                    $scope.modalOptions.close = function (result) {
                        $uibModalInstance.dismiss('cancel');
                    };

                    $scope.dateOptions = {
                        dateDisabled: disabled,
                        formatYear: 'yy',
                        maxDate: new Date(),
                        minDate: new Date(1980, 1, 1),
                        startingDay: 1
                    };

                    // Disable weekend selection
                    function disabled(data) {
                        var date = data.date,
                            mode = data.mode;
                        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
                    }

                    $scope.open1 = function() {
                        $scope.popup1.opened = true;
                    };

                    $scope.setDate = function(month, day, year) {
                        $scope.modalOptions.np.dateHired = new Date(month, day, year);
                    };


                    $scope.popup1 = {
                        opened: false
                    };
                };
                tempModalDefaults.controller.$inject = ['$scope', '$uibModalInstance'];
            }

            return $uibModal.open(tempModalDefaults).result;
        };

    };
    modalService.$inject = ['$uibModal'];
    angular.module('gditApp').service('modalService', modalService);
}());