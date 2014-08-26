'use strict';

/* Controllers */
angular.module('myApp.order_controller', [])
    .controller('OrderController', ['$scope', 'OrderModelSvc', 'OrderSizeFactory', 'OrderBackingFabricFactory',
        'OrderSashingFactory', 'OrderThreadFactory', 'OrderReviewFactory',
        function ($scope, orderModel, OrderSizeFactory, OrderBackingFabricFactory, OrderSashingFactory, OrderThreadFactory, OrderReviewFactory) {

            $scope.$watch("currentPage", function(){
                $scope.buildTabs();
            });
            $scope.currentPage = 0;
            $scope.firstTime = true;
            $scope.orderModel = orderModel;

            $scope.pages = [];
            $scope.selectionsMade = [];
            $scope.tabs=[];

            $scope.buildTabs = function getTabInfo() {
                $scope.tabs = $scope.pages.map(function (p, index) {
                    return {page: index, tabText: p.tabText, disabled: $scope.tabDisabled(index)}
                });
            };

            $scope.setPage = function setPage(p) {
                $scope.gotoPage(p);
            };
            $scope.gotoPage = function (p) {
                $scope.currentPage = p;
                if ($scope.pages[$scope.currentPage].autoAccept) $scope.selectionMade();
                if ($scope.pages[$scope.currentPage].preFunction) $scope.pages[$scope.currentPage].preFunction();
            };

            // Guess what the hardest piece of code was...
            // The tab should be disabled if it is the current tab (why navigate to where we are?) or if
            // a selection has not been made on the given tab.
            //                this     prev     tab
            //     current  selected selected enabled?  invert
            //        N        N         N       N
            //        N        N         Y       Y
            //        N        Y         N       Y
            //        N        Y         Y       Y
            //        Y        N         N       N
            //        Y        N         Y       N
            //        Y        Y         N       N
            //        Y        Y         N       N
            $scope.tabDisabled = function tabDisabled(t) {
                var onCurrentPage = t == $scope.currentPage;
                var thisPageSelected = $scope.selectionsMade[t];
                var prevPageSelected = t > 0 && $scope.selectionsMade[t-1];
                var tabShouldBeEnabled = !onCurrentPage && (thisPageSelected || prevPageSelected);
                return !tabShouldBeEnabled; // yay negative logic
            };
            $scope.cantGoBack = function cantGoBack() {
                return ($scope.currentPage == 0) ? "checked" : "";
            };
            /* Can't go forward if the current page is unworked */
            $scope.cantGoForward = function cantGoForward() {
                return ($scope.currentPage == 4 || !$scope.selectionsMade[$scope.currentPage]) ? "checked" : "";
            };
            $scope.previous = function previous() {
                $scope.gotoPage($scope.currentPage - 1);
            };
            $scope.next = function next() {
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
                $scope.selectionsMade[$scope.currentPage] = true;
                console.log("selection made on page ",$scope.currentPage);
            };

            $scope.registerTab = function (priorityOrder, tabParticulars) {
                $scope.pages[priorityOrder] = tabParticulars;
                $scope.selectionsMade[priorityOrder] = false;
            };

            $scope.registerTab(0, OrderSizeFactory);
            $scope.registerTab(1, OrderBackingFabricFactory);
            $scope.registerTab(2, OrderSashingFactory);
            $scope.registerTab(3, OrderThreadFactory);
            $scope.registerTab(4, OrderReviewFactory);

            $scope.$watch(function(){
                return OrderSizeFactory.size+":"+OrderBackingFabricFactory.backingFabric+":"+OrderSashingFactory.sashing+":"+
                    OrderThreadFactory.thread;
            }, function(){
                $scope.selectionMade();
                $scope.buildTabs();
            });

        }]);