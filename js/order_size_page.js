'use strict';
angular.module('myApp.order_tabs', [])
    .directive('sizeTable', ['OrderSizeFactory', function (model) {
        return {
            scope: {},
            replace: true,
            restrict: 'E',
            templateUrl: 'partials/order_table.html',
            controller: 'OrderSizeController'
        };
    }])
    .controller('OrderSizeController', ['$scope', 'OrderSizeFactory', function ($scope, OrderSizeFactory) {
        $scope.model = OrderSizeFactory;
    }])
    .factory('OrderSizeFactory', function () {
        return {
            header: {
                blocks: "# of Blocks",
                block_size: "Arrangement of Blocks",
                dimension: "Approx. Size",
                price: "Price",
                sashing: "Additional Price of Sashing"
            },
            sizes: [
                {blocks: 9, block_size: "3 x 3", dimension: "3’ 9\" x 3’9\"", price: 75, sashing: 25},
                {blocks: 12, block_size: "3 x 4", dimension: "3' 9\" x 5' 0\"", price: 82, sashing: 38},
                {blocks: 15, block_size: "3 x 5", dimension: "3' 9\" x 6' 0\"", price: 92, sashing: 48},
                {blocks: 16, block_size: "4 x 4", dimension: "5' 0\" x 5' 0\"", price: 100, sashing: 50},
                {blocks: 20, block_size: "4 x 5", dimension: "5' 0\" x 6' 3\"", price: 113, sashing: 57},
                {blocks: 24, block_size: "4 x 6", dimension: "5' 0\" x 7' 6\"", price: 125, sashing: 85},
                {blocks: 25, block_size: "5 x 5", dimension: "6' 3\" x 6' 3\"", price: 142, sashing: 88},
                {blocks: 30, block_size: "5 x 6", dimension: "6' 3\" x 7' 6\"", price: 180, sashing: 95},
                {blocks: 35, block_size: "5 x 7", dimension: "6' 3\" x 8' 9\"", price: 195, sashing: 110},
                {blocks: 36, block_size: "6 x 6", dimension: "7' 6\" x 7' 6\"", price: 205, sashing: 130},
                {blocks: 42, block_size: "6 x 7", dimension: "7' 6\" x 8' 9\"", price: 225, sashing: 150},
                {blocks: 49, block_size: "7 x 7", dimension: "8' 9\" x 8' 9\"", price: 260, sashing: 170}
            ],
            tabText: "1. Select the Size",
            partial: "partials/order1.html",
            autoAccept: false,
            size: undefined
        }
    }).directive('backingFabric', function () {
        return {
            scope: {},
            replace: true,
            restrict: 'E',
            templateUrl: 'partials/backing_fabric_picker.html',
            controller: 'OrderBackingFabricController'
        };
    }).controller('OrderBackingFabricController', ['$scope', 'OrderBackingFabricFactory', function ($scope, OrderBackingFabricFactory) {
        $scope.model = OrderBackingFabricFactory;
    }])
    .factory('OrderBackingFabricFactory', [function () {
        return {
            tabText: "2. Backing Color",
            partial: "partials/order2.html",
            autoAccept: false,
            backingFabrics: [
                {text: "Dark Red", color: "#990000"},
                {text: "Dark Blue", color: "#333399"},
                {text: "Black", color: "#000000"},
                {text: "Brown", color: "#663333"},
                {text: "Pale Green", color: "#99cc66"},
                {text: "Light Blue", color: "#6699ff"},
                {text: "Tan", color: "#cccc66"},
                {text: "Red", color: "#cc3300"}
            ],
            backingFabric: undefined,
            backingFabricColor: function () {
                return this.backingFabric >= 0 ? this.backingFabrics[this.backingFabric].color : "?"
            }
        };
    }]).controller('OrderSashingController', ['$scope', 'OrderSashingFactory', function ($scope, OrderSashingFactory) {
        $scope.model = OrderSashingFactory;
    }]).factory('OrderSashingFactory', ['OrderSizeFactory', 'OrderBackingFabricFactory', function (OrderSizeFactory, OrderBackingFabricFactory) {
        return {
            tabText: "3. Sashing Options",
            partial: "partials/order3.html",
            autoAccept: false,
            sashing: undefined,
            zoot: function () {
                return "zoot!";
            },
            price: function () {
                return (this.sashing && OrderSizeFactory.size >= 0) ? OrderSizeFactory.sizes[OrderSizeFactory.size].sashing : 0
            },
            color: function () {
                return OrderBackingFabricFactory.backingFabricColor()
            }
        };
    }]).controller("OrderThreadController", ['$scope', 'OrderThreadFactory', function($scope, OrderThreadFactory){
        $scope.model = OrderThreadFactory;
    }]).factory('OrderThreadFactory', function () {
        return {
            tabText: "4. Thread Options",
            partial: "partials/order4.html",
            autoAccept: false,
            thread: undefined,
            threads: [
                {text: "Solid", img: "img/solid.png", price: 0, narrative: "Standard thread"},
                {text: "Variegated", img: "img/variegated.png", price: 5, narrative: "Upgrade to variegated thread"}
            ]
        }
    }).factory('OrderReviewFactory', ['OrderModelSvc', function (orderModel) {
        return {tabText: "5. Review Your Order", partial: "partials/order5.html", autoAccept: false, preFunction: function () {
            orderModel.genLineItems();
        }}
    }]
)
;