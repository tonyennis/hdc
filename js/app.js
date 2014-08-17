'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
    'ngRoute',
    'myApp.directives',
    'myApp.controllers',
    'myApp.order_controller',
    'myApp.tab_member',
    'myApp.order_bits',
    'myApp.services'
]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/view1'});
    }]);
