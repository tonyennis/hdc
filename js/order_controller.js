'use strict';

/* Controllers */
angular.module('myApp.order_controller', [])
    .controller('OrderController', ['$scope', 'OrderModelSvc', function ($scope, orderModel) {

        $scope.$watchCollection("[orderModel.getSize(),orderModel.getBackingFabric(),orderModel.getSashing(),orderModel.getThread()]", function () {
            $scope.selectionMade()
        });
        $scope.currentPage = 0;
        $scope.firstTime = true;
        $scope.orderModel = orderModel;

        $scope.pages = [
            {page: 0, tabText: "1. Select the Size", selectionMade: false, partial: "partials/order1.html", autoAccept: false},
            {page: 1, tabText: "2. Backing Color", selectionMade: false, partial: "partials/order2.html", autoAccept: false},
            {page: 2, tabText: "3. Sashing Options", selectionMade: false, partial: "partials/order3.html", autoAccept: false},
            {page: 3, tabText: "4. Thread Options", selectionMade: false, partial: "partials/order4.html", autoAccept: false},
            {page: 4, tabText: "5. Review Your Order", selectionMade: false, partial: "partials/order5.html", autoAccept: true, preFunction: function() { orderModel.genLineItems();}}
        ];
        $scope.getPages = function getPages() {
            return $scope.pages;
        };
        $scope.setPage = function setPage(p) {
            $scope.gotoPage(p);
        };
        $scope.gotoPage = function (p) {
            $scope.currentPage = p;
            if ($scope.pages[$scope.currentPage].autoAccept) $scope.selectionMade();
            if ($scope.pages[$scope.currentPage].preFunction) $scope.pages[$scope.currentPage].preFunction();
        };
        $scope.tabDisabled = function tabDisabled(t) {
            return (t == $scope.currentPage || !$scope.pages[t].selectionMade) ? "checked" : "";
        };
        $scope.cantGoBack = function cantGoBack() {
            return ($scope.currentPage == 0) ? "checked" : "";
        };
        /* Can't go forward if the current page is unworked */
        $scope.cantGoForward = function cantGoForward() {
            return ($scope.currentPage == 4 || !$scope.pages[$scope.currentPage].selectionMade) ? "checked" : "";
        };
        $scope.previous = function previous() {
            $scope.gotoPage($scope.currentPage - 1);
        };
        $scope.next = function next() {
            console.log("#next to "+($scope.currentPage + 1));
            $scope.gotoPage($scope.currentPage + 1);
        };
        $scope.currentPartial = function currentPartial() {
            return $scope.pages[$scope.currentPage].partial;
        };
        $scope.selectionMade = function selectionMade() {
            if ($scope.firstTime) {
                $scope.firstTime = false;
                return;
            }
            console.log("selection made on page "+$scope.currentPage);
            $scope.pages[$scope.currentPage].selectionMade = true;
        };
    }]);