'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('PageSelectionController', ['$scope', function ($scope) {
        var pages = {
            'home': 'partials/home.html',
            'about': 'partials/about.html',
            'samples': 'partials/samples.html',
            'quilt info': 'partials/quilt_info.html',
            'order': 'partials/order.html',
            'contact us': 'partials/contact_us.html'
        };

        this.current_page = 'home';
        this.setPage = function (page) {
            this.current_page = page;
        };
        this.getPage = function () {
            return this.current_page;
        };
        this.getPartial = function() {
            return pages[this.getPage()] || pages['home'];
        };
    }])
    .controller('PricelistController', function () {
        this.header = [
            "# of Blocks", "Arrangement of Blocks", "Approx. Size", "Price", "Additional Price of Sashing"
        ];
        this.prices =
            [
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
            ];
    });
//    .controller('OrderController', function ($scope) {
//        $scope.orderModel = new OrderModel();
//        this.currentPage = 0;
//
//        this.genLineItems = function () {
//            $scope.orderModel.genLineItems();
//        };
//
//        this.pages = [
//            {page: 0, tabText: "1. Select the Size", selectionMade: false, partial: "partials/order1.html", autoAccept: false},
//            {page: 1, tabText: "2. Backing Color", selectionMade: false, partial: "partials/order2.html", autoAccept: false},
//            {page: 2, tabText: "3. Sashing Options", selectionMade: false, partial: "partials/order3.html", autoAccept: false},
//            {page: 3, tabText: "4. Thread Options", selectionMade: false, partial: "partials/order4.html", autoAccept: false},
//            {page: 4, tabText: "5. Review Your Order", selectionMade: false, partial: "partials/order5.html", autoAccept: true, preFunction: this.genLineItems}
//        ];
//
//        this.setSize = function (index) {
//            $scope.orderModel.setSize(index);
//            this.selectionMade();
//        };
//        this.setBackingColor = function (index) {
//            $scope.orderModel.setBackingColor(index);
//            this.selectionMade();
//        };
//        this.setSashing = function (index) {
//            $scope.orderModel.setSashing(index);
//            this.selectionMade();
//        };
//        this.setThread = function (index) {
//            $scope.orderModel.setThread(index);
//            this.selectionMade();
//        };
//
//        this.getPages = function () {
//            return this.pages;
//        };
//        this.setPage = function (p) {
//            this.currentPage = p;
//        };
//        this.tabDisabled = function (t) {
//            return (t == this.currentPage || !this.pages[t].selectionMade) ? "checked" : "";
//        };
//        this.cantGoBack = function () {
//            return (this.currentPage == 0) ? "checked" : "";
//        };
//        /* Can't go forward if the current page is unworked */
//        this.cantGoForward = function () {
//            return (this.currentPage == 4 || !this.pages[this.currentPage].selectionMade) ? "checked" : "";
//        };
//        this.previous = function () {
//            this.currentPage = this.currentPage - 1;
//        };
//
//        this.next = function () {
//            this.currentPage = this.currentPage + 1;
//            // Merely visiting some tabs completes them.
//            if (this.pages[this.currentPage].autoAccept) this.selectionMade();
//            if ("preFunction" in this.pages[this.currentPage]) {
//                (this.pages[this.currentPage].preFunction)();
//            }
//        };
//
//        this.currentPartial = function () {
//            return this.pages[this.currentPage].partial;
//        };
//
//        this.selectionMade = function () {
//            this.pages[this.currentPage].selectionMade = true;
//        }
//
//    })
//;
  
  
