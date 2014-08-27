'use strict';

beforeEach(module("myApp.order-size"));

describe('Size Directive', function () {
    var element,
        $scope;

    beforeEach(module("partials/order_table.html"));

    beforeEach(inject(function ($compile, $rootScope) {
        $scope = $rootScope;
        element = angular.element("<size-table></size-table>");
        $compile(element)($rootScope);
        $scope.$digest();
    }));
    it("should compile", function () {
        expect(element.children('table')).to.be.ok;
    });
    it("should have rows", function () {
        expect(element.children('table').children('tr').length).to.equal(13);
    });
});
describe('factory shenanigans', function () {
    var fac;
    beforeEach(inject(function (OrderSizeFactory) {
        fac = OrderSizeFactory;
    }));

    describe('Size Factory', function () {
        function checkBlockSize(index, text) {
            fac.size = index;
            expect(fac.blockSize()).to.equal(text);
        }
        function checkDimension(index, text) {
            fac.size = index;
            expect(fac.dimension()).to.equal(text);
        }
        function checkBlocks(index, text) {
            fac.size = index;
            expect(fac.blocks()).to.equal(text);
        }
        function checkLineItem(index, price) {
            fac.size = index;
            var li = fac.lineItem();
            expect(li.price).to.equal(price);
            expect(li.text).to.contain(fac.blockSize());
        }
        it("should return a blockSize", function(){
            checkBlockSize(2, "3 x 5");
            checkBlockSize(4, "4 x 5");
        });
        it("should return a dimension", function(){
            checkDimension(3, "5' 0\" x 5' 0\"");
            checkDimension(5, "5' 0\" x 7' 6\"");
        });
        it("should return the blocks", function(){
            checkBlocks(6, 25);
            checkBlocks(8, 35);
        });
        it("should return a line item", function(){
            checkLineItem(7, 180);
            checkLineItem(9, 205);
        });
    });
    describe('Size Controller', function () {
        var scope;

        beforeEach(inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();

            var createController = function () {
                return $controller('OrderSizeController', {
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
            expect(scope.model.sizes.length).to.equal(12);
        });
    });
});