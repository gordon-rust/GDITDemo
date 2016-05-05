/**
 * Created by josephstarustka on 5/3/16.
 */
(function() {
    var app = angular.module('gditApp',['ngRoute','ui.bootstrap']);
    app.config(function($routeProvider){
        $routeProvider
            .when('/', {
                controller: 'gridController',
                templateUrl: 'app/views/personGrid.html'
            })
            .otherwise({redirectTo: '/'});
    });
}());


