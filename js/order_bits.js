angular.module('myApp.order_bits', [])
    .directive('backingFabric', function () {
        return {
            scope: {
                orderModel: '='
            },
            replace: true,
            restrict: 'E',
            templateUrl: 'partials/backing_fabric_picker.html'
        };
    })
    .directive('orderTable', function () {
        return {
            scope: {
                orderModel: '='
            },
            replace: true,
            restrict: 'E',
            templateUrl: 'partials/order_table.html'
        };
    })
    .directive('orderNav', function() {
        return  {
            replace: true,
            restrict: 'E',
            templateUrl: 'partials/order_nav.html'
        };
    })
;