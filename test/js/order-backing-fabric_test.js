/**
 * Created by Tony on 8/25/2014.
 */
'use strict';

beforeEach(module("myApp.order-backing-fabric"));

describe("BackingFabricDirective", function () {
    var element,
        $scope;

    beforeEach(module("partials/backing_fabric_picker.html"));

    beforeEach(inject(function ($compile, $rootScope) {
        $scope = $rootScope;
        element = angular.element("<backing-fabric></backing-fabric>");
        $compile(element)($rootScope);
        $scope.$digest();
    }));
    it("should compile", function () {
        expect(element.children('table')).to.be.ok;
    });
    it("should have rows", function () {
        expect(element.children('table').children('tr').length).to.equal(8);
    });
});
describe("Factory Shenanigans", function () {
    var fac;
    beforeEach(inject(function (OrderBackingFabricFactory) {
        fac = OrderBackingFabricFactory;
    }));

    describe("BackingFabricFactory", function () {

        function checkName(index, text) {
            fac.backingFabric = index;
            expect(fac.backingFabricName()).to.equal(text);
        }

        function checkColor(index, color) {
            fac.backingFabric = index;
            expect(fac.backingFabricColor()).to.equal(color);
        }

        it("should return the fabric name", function () {
            checkName(4, "Pale Green");
            checkName(2, "Black");
        });
        it("should return the fabric color if a color has been set", function () {
            checkColor(4, "#99cc66");
            checkColor(5, "#6699ff");
        });
        it("should return a question mark if a color has not been set", function () {
            checkColor(undefined, "?");
        });
    });
    describe("BackingFabricController", function () {
        var scope;

        beforeEach(inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();

            var createController = function () {
                return $controller('OrderBackingFabricController', {
                    '$scope': scope,
                    'OrderBackingFabricFactory': fac
                });
            };
            createController();
        }));

        it("should initialize a model", function () {
            expect(scope.model).to.be.ok;
        });

        it("should initialize the right model", function () {
            expect(scope.model.backingFabrics.length).to.equal(8);
        });
    })
});