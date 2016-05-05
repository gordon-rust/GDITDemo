/**
 * Created by josephstarustka on 5/5/16.
 */
(function() {

    var gridController = function ($scope, $http, modalService){
        var url = "http://localhost:3000";
        var modalInputDefaults = {
            backdrop: true,
            keyboard: true,
            modalFade: true,
            templateUrl: '/GDITDemo/public/app/views/inputModal.html'
        };
        var modalGenericDefaults = {
            backdrop: true,
            keyboard: true,
            modalFade: true,
            templateUrl: '/GDITDemo/public/app/views/genericModal.html'
        };
        loadProducts();

        $scope.editPerson = function (personId) {
            $http({
                method: "GET",
                url: url + "/find",
                params: {id:personId}
            }).then(function success(response) {
                var modalOptions = {
                    np: response.data,
                    closeButtonText: 'Cancel',
                    actionButtonText: 'Save'
                };

                modalService.showModal(modalInputDefaults, modalOptions).then(function (result) {
                    updatePerson(result);
                });
            }, function error(response) {
                console.log(response);
            });
        };

        $scope.deletePerson = function (personId) {
            var modalOptions = {
                closeButtonText: 'Cancel',
                actionButtonText: 'Delete',
                headerText: 'Delete Selected Person',
                bodyText: 'Are you sure you want to delete this person from the database?'
            };

            modalService.showModal(modalGenericDefaults, modalOptions).then(function (result) {
                $http({
                    method: "DELETE",
                    url: url + "/delete",
                    params: {id:personId}
                }).then(function success(response) {
                    loadProducts();
                }, function error(response) {
                    console.log(response);
                });
            });
        };
        
        $scope.openInputModal = function() {
            var modalOptions = {
                np: {},
                closeButtonText: 'Cancel',
                actionButtonText: 'Save'
            };

            modalService.showModal(modalInputDefaults, modalOptions).then(function (result) {
                insertNewPerson(result);
            });
        };

        function insertNewPerson(data) {
            $http({
                method: "POST",
                url: url + "/add",
                data: data
            }).then(function success(response) {
                loadProducts();
            }, function error(response) {
                console.log(response);
            });
        }

        function updatePerson(data) {
            console.log(data);
            $http({
                method: "PUT",
                url: url + "/update",
                data: data,
                params: {id:data._id}
            }).then(function success(response) {
                loadProducts();
            }, function error(response) {
                console.log(response);
            });
        }

        function loadProducts() {
            $http({
                method: "GET",
                url: url
            }).then(function success(response) {
                $scope.people = response.data;
            }, function error(response) {
                console.log(response);
            });

        }
    };

    gridController.$inject = ['$scope', '$http', 'modalService'];
    angular.module('gditApp')
        .controller('gridController', gridController);
}());