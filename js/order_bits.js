angular.module('myApp.order_bits', [])
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
;
