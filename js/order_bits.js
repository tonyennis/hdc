'use strict';

angular.module('myApp.order_bits', [])


    .directive('orderNav', function() {
        return  {
            replace: true,
            restrict: 'E',
            templateUrl: 'partials/order_nav.html'
        };
    })
;