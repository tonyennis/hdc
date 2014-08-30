/**
 * Created by Tony on 8/29/2014.
 */
describe("Order review goodness", function () {
    var opf, osif, otf, osaf, orf, obff;

    beforeEach(module("myApp"));
    beforeEach(inject(function (OrderPromoFactory, OrderSizeFactory, OrderThreadFactory, OrderSashingFactory, OrderReviewFactory, OrderBackingFabricFactory) {
        opf = OrderPromoFactory;
        osif = OrderSizeFactory;
        otf = OrderThreadFactory;
        osaf = OrderSashingFactory;
        orf = OrderReviewFactory;
        obff = OrderBackingFabricFactory;
    }));

    describe("Order Review Factory", function () {
        it("should produce a line item", function () {
            var lineItem = orf.lineItem();
            expect(lineItem.price).to.equal(18);
            expect(lineItem.text).to.equal("Shipping");
        });
    });
    describe("Order Review Controller", function () {
        var scope;
        beforeEach(inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();

            var createController = function () {
                return $controller('OrderReviewController', {
                    '$scope': scope,
                    'OrderReviewFactory': orf
                });
            };
            createController();
        }));

        it("should initialize a model", function () {
            expect(scope.model).to.be.ok;
        });

        it("should initialize the right model", function () {
            expect(scope.model.tabText).to.equal("5. Review Your Order");
        });

        function factorySettings() {
            osif.size = 1;
            obff.backingFabric = 1;
            osaf.sashing = true;
            otf.thread = 1;
            opf.promoCode = "";
            scope.$digest();
        }
        function watchLineItems(f) {
            factorySettings();
            var nar1 = JSON.stringify(scope.lineItems);
            f();
            scope.$digest();
            var nar2 =JSON.stringify(scope.lineItems);
            expect(nar1).to.not.equal(nar2);
        }
        function watchIt(f) {
            factorySettings();
            var nar1 = scope.narrative;
            f();
            scope.$digest();
            var nar2 = scope.narrative;
            expect(nar1).to.not.equal(nar2);
            expect(nar2).to.contain("Your quilt will be made from ");
        }

        it("should watch the size model and produce a narrative", function () {
            watchIt(function () {
                osif.size = 2
            });
        });
        it("should watch the backing fabric model and produce a narrative", function () {
            watchIt(function () {
                obff.backingFabric = 2
            });
        });
        it("should watch the sashing model and produce a narrative", function () {
            watchIt(function () {
                osaf.sashing = false
            });
        });
        it("should watch the thread model and produce a narrative", function () {
            watchIt(function () {
                otf.thread = 0
            });
        });
        it("should watch the size model and produce line items", function () {
            watchLineItems(function () {
                osif.size = 2
            });
        });
        it("should watch the sashing model and produce line items", function () {
            watchLineItems(function () {
                osaf.sashing = false
            });
        });
        it("should watch the thread model and produce line items", function () {
            watchLineItems(function () {
                otf.thread = 0
            });
        });
        it("should watch the promos model and produce line items", function () {
            watchLineItems(function () {
                opf.promoCode = "Zappa";
            });
        });
    });
});
