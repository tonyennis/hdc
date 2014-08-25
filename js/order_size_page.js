'use strict';
angular.module('myApp.order_tabs', [])
    .directive('sizeTable', ['OrderSizeFactory', function () {
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
            size: undefined,
            dimension: function () {
                return this.sizes[this.size].dimension
            },
            blockSize: function () {
                return this.sizes[this.size].block_size
            },
            blocks: function () {
                return this.sizes[this.size].blocks
            },
            lineItem: function () {
                return {
                    text: "Your quilt will be " + this.sizes[this.size].block_size + " squares",
                    price: this.sizes[this.size].price};
            }
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
            },
            backingFabricName: function () {
                return this.backingFabrics[this.backingFabric].text
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
    }]).controller("OrderThreadController", ['$scope', 'OrderThreadFactory', function ($scope, OrderThreadFactory) {
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
            ],
            name: function () {
                return this.threads[this.thread].text;
            },
            lineItem: function () {
                return {text: this.threads[this.thread].text, price: this.threads[this.thread].price}
            }
        };
    }).controller("OrderPromoController", ['$scope', 'OrderPromoFactory', function ($scope, OrderPromoFactory) {
        $scope.model = OrderPromoFactory;
    }]).factory("OrderPromoFactory", function () {
        return {
            promoCode: "",
            promos: [
                {text: "Zappa", price: -5},
                {text: "Setzer", price: -10}
            ],
            lineItemPromo: function () {
                var text = "No promo code",
                    price = 0;
                for (var i = 0; i < this.promos.length; i++) {
                    if (this.promos[i].text.toLowerCase() === this.promoCode.toLowerCase()) {
                        text = "Promo code";
                        price = this.promos[i].price;
                        break;
                    }
                }
                return { text: text, price: price};
            }
        };
    }).controller("OrderReviewController", [
        '$scope',
        'OrderReviewFactory',
        'OrderSizeFactory',
        'OrderBackingFabricFactory',
        'OrderSashingFactory',
        'OrderThreadFactory',
        'OrderPromoFactory',
        function ($scope, ORF, OSiF, OBFF, OSaF, OTF, OPF) {

            $scope.$watch(function () {
                return OSiF.size + ":" + OBFF.backingFabric + ":" + OSaF.sashing + ":" + OTF.thread + ":" + OPF.promoCode;
            }, function () {
                $scope.genLineItems();
                $scope.genNarrative();
            });

            $scope.model = ORF;
            $scope.lineItems = [];
            $scope.narrative = "";

            $scope.genLineItems = function genLineItems() {
                $scope.lineItems = [];
                $scope.lineItems.push(OSiF.lineItem());
                $scope.lineItems.push(OSaF.lineItem());
                $scope.lineItems.push(OTF.lineItem());
                $scope.lineItems.push(OPF.lineItemPromo());
                $scope.lineItems.push(ORF.lineItemShipping());
                var total = 0;
                $scope.lineItems.forEach(function (line) {
                    total += line.price;
                });
                $scope.lineItems.push({text: "Order Total", price: total});
                return $scope.lineItems;
            };

            $scope.genNarrative = function () {

                var dimension = OSiF.dimension();
                dimension = dimension.replace("x", "wide by");
                dimension = dimension + " long";

                $scope.narrative = "Your quilt will be made from "
                    + OSiF.blocks()
                    + " t-shirts arranged in a "
                    + OSiF.blockSize()
                    + " rectangle and will measure about "
                    + dimension
                    + ". We'll back"
                    + OSaF.narrative()
                    + " it with a "
                    + OBFF.backingFabricName().toLowerCase()
                    + " fabric and quilt it using a "
                    + OTF.name().toLowerCase()
                    + " thread."
                ;
            };
        }]).factory('OrderReviewFactory', [function () {
        return {
            shipping: 18,
            tabText: "5. Review Your Order",
            partial: "partials/order5.html",
            autoAccept: false,
            lineItemShipping: function () {
                return {text: "Shipping", price: this.shipping};
            }
        }
    }]
)
;