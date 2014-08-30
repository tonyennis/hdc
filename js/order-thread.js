'use strict';
angular.module('myApp.order-thread', [])
    .controller("OrderThreadController", ['$scope', 'OrderThreadFactory', function ($scope, OrderThreadFactory) {
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
    });