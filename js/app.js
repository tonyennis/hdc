'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
    'ngRoute',
    'myApp.directives',
    'myApp.controllers',
    'myApp.order_controller',
    'myApp.tab_member',
    'myApp.order_bits',
    'myApp.services',
    'myApp.order-sashing',
    'myApp.order-size',
    'myApp.order-backing-fabric',
    'myApp.order-thread',
    'myApp.order-promo',
    'myApp.order-review'
]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/view1'});
    }]);
