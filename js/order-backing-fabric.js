'use strict';
angular.module('myApp.order-backing-fabric', [])
    .directive('backingFabric', function () {
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
    }]);
