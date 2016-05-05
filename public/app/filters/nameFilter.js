/**
 * Created by josephstarustka on 5/5/16.
 */
(function() {
    var nameFilter = function() {
        return function (po) {
            if(po.middleInitial == '') {
                return (po.firstName + " " + po.lastName);
            }
            else {
                return (po.firstName + " " + po.middleInitial + ". " + po.lastName);
            }
        };
    };
    angular.module('gditApp').filter('nameFilter', nameFilter);
}());
