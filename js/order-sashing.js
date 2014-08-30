'use strict';
angular.module('myApp.order-sashing', [])
    .controller('OrderSashingController', ['$scope', 'OrderSashingFactory', function ($scope, OrderSashingFactory) {
        $scope.model = OrderSashingFactory;
    }])
    .factory('OrderSashingFactory', ['OrderSizeFactory', 'OrderBackingFabricFactory', function (OrderSizeFactory, OrderBackingFabricFactory) {
        return {
            tabText: "3. Sashing Options",
            partial: "partials/order3.html",
            autoAccept: false,
            sashing: undefined,
            price: function () {
                return (this.sashing && OrderSizeFactory.size >= 0) ? OrderSizeFactory.sizes[OrderSizeFactory.size].sashing : 0
            },
            color: function () {
                return OrderBackingFabricFactory.backingFabricColor()
            },
            lineItem: function () {
                var text = "No sashing",
                    price = 0;
                if (this.sashing) {
                    text = "Add sashing";
                    price = OrderSizeFactory.sizes[OrderSizeFactory.size].sashing;
                }
                return {text: text, price: price};
            },
            narrative: function () {
                return this.sashing ? " and sash" : ""
            }
        };
    }]);