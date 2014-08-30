'use strict';
angular.module('myApp.order-promo', [])
.controller("OrderPromoController", ['$scope', 'OrderPromoFactory', function ($scope, OrderPromoFactory) {
    $scope.model = OrderPromoFactory;
}]).factory("OrderPromoFactory", function () {
    return {
        promoCode: "",
        promos: [
            {text: "Zappa", price: -5},
            {text: "Setzer", price: -10}
        ],
        lineItem: function () {
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
});