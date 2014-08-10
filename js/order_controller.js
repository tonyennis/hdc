'use strict';

/* Controllers */
angular.module('myApp.controllers')
.factory('orderModel', function() { return new OrderModel(); })
.controller('OrderController', ['$scope', 'orderModel', function ($scope, orderModel) {
    this.currentPage = 0;

    $scope.getOrderModel = function getOrderModel() {
        return orderModel;
    };   
        
    this.genLineItems = function () {
        orderModel.genLineItems();
    };

    this.pages = [
        {page: 0, tabText: "1. Select the Size", selectionMade: false, partial: "partials/order1.html", autoAccept: false},
        {page: 1, tabText: "2. Backing Color", selectionMade: false, partial: "partials/order2.html", autoAccept: false},
        {page: 2, tabText: "3. Sashing Options", selectionMade: false, partial: "partials/order3.html", autoAccept: false},
        {page: 3, tabText: "4. Thread Options", selectionMade: false, partial: "partials/order4.html", autoAccept: false},
        {page: 4, tabText: "5. Review Your Order", selectionMade: false, partial: "partials/order5.html", autoAccept: true, preFunction: this.genLineItems}
    ];

    this.setSize = function (index) {
        orderModel.setSize(index);
        this.selectionMade();
    };
    this.setBackingColor = function (index) {
        orderModel.setBackingColor(index);
        this.selectionMade();
    };
    this.setSashing = function (index) {
        orderModel.setSashing(index);
        this.selectionMade();
    };
    this.setThread = function (index) {
        orderModel.setThread(index);
        this.selectionMade();
    };

    this.getPages = function () {
        return this.pages;
    };
    this.setPage = function (p) {
        this.currentPage = p;
    };
    this.tabDisabled = function (t) {
        return (t == this.currentPage || !this.pages[t].selectionMade) ? "checked" : "";
    };
    this.cantGoBack = function () {
        return (this.currentPage == 0) ? "checked" : "";
    };
    /* Can't go forward if the current page is unworked */
    this.cantGoForward = function () {
        return (this.currentPage == 4 || !this.pages[this.currentPage].selectionMade) ? "checked" : "";
    };
    this.previous = function () {
        this.currentPage = this.currentPage - 1;
    };

    this.next = function () {
        this.currentPage = this.currentPage + 1;
        // Merely visiting some tabs completes them.
        if (this.pages[this.currentPage].autoAccept) this.selectionMade();
        if ("preFunction" in this.pages[this.currentPage]) {
            (this.pages[this.currentPage].preFunction)();
        }
    };

    this.currentPartial = function () {
        return this.pages[this.currentPage].partial;
    };

    this.selectionMade = function () {
        this.pages[this.currentPage].selectionMade = true;
    }

}]);