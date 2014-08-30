'use strict';

var fac,
    osf,
    obff;

describe("OrderSashing Factory Tests", function () {
    beforeEach(module("myApp"));

    beforeEach(inject(function (OrderSashingFactory, OrderSizeFactory, OrderBackingFabricFactory) {
        fac = OrderSashingFactory;
        osf = OrderSizeFactory;
        obff = OrderBackingFabricFactory;
    }));


    describe('Sashing Factory', function () {
        function checkPrice(index, price) {
            osf.size = index;
            fac.sashing = true;
            expect(fac.price()).to.equal(price);
        }

        function checkColor(index, text) {
            obff.backingFabric = index;
            expect(fac.color()).to.equal(text);
        }

        function checkNarrative(sashing, text) {
            fac.sashing = sashing;
            expect(fac.narrative()).to.equal(text);
        }

        function checkLineItem(sizeIndex, sashing, text) {
            osf.size = sizeIndex;
            fac.sashing = sashing;
            var li = fac.lineItem();
            expect(li.price).to.equal(text);
        }

        it("should return a price", function () {
            checkPrice(2, 48);
            checkPrice(4, 57);
        });
        it("should return a color", function () {
            checkColor(6, "#cccc66");
            checkColor(7, "#cc3300");
        });
        it("should return a line item", function () {
            checkLineItem(6, true, 88, "Add sashing");
            checkLineItem(8, true, 110, "Add sashing");
            checkLineItem(6, false, 0, "No sashing");
        });
        it("should return a narrative", function () {
            checkNarrative(true, " and sash");
            checkNarrative(false, "");
        });
    });
});
describe('Sashing Controller', function () {
    var scope;
    beforeEach(module("myApp"));
    beforeEach(inject(function ($controller, $rootScope, OrderSashingFactory) {
        var fac = OrderSashingFactory;
        scope = $rootScope.$new();

        var createController = function () {
            return $controller('OrderSashingController', {
                '$scope': scope,
                model: fac
            });
        };
        createController();
    }));

    it("should initialize a model", function () {
        expect(scope.model).to.be.ok;
    });

    it("should initialize the right model", function () {
        expect(scope.model.tabText).to.equal("3. Sashing Options");
    });
});
