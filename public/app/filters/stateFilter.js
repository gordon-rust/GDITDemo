/**
 * Created by josephstarustka on 5/5/16.
 */
(function() {
    var stateFilter = function() {
        return function (state) {
            if (state) {
                return ("Active");
            }
            else {
                return ("Not Active");
            }
        };
    };
    angular.module('gditApp').filter('stateFilter', stateFilter);
}());