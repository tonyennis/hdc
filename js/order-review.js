'use strict';
angular.module('myApp.order-review', [])
    .controller("OrderReviewController", [
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
                $scope.lineItems.push(OPF.lineItem());
                $scope.lineItems.push(ORF.lineItem());
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
            lineItem: function () {
                return {text: "Shipping", price: this.shipping};
            }
        }
    }]
);