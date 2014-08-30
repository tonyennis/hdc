
describe("OrderPromoFactory tests", function(){
    var fac;

    beforeEach(module("myApp"));
    beforeEach(inject(function (OrderPromoFactory) {
        fac = OrderPromoFactory;
    }));

    it("should produce a line item", function(){
        fac.promoCode = "SetZer";
        var lineItem = fac.lineItem();
        expect(lineItem.text).to.equal("Promo code");
        expect(lineItem.price).to.equal(-10);
    });
    it("should produce a line item", function(){
        fac.promoCode = "Lennon";
        var lineItem = fac.lineItem();
        expect(lineItem.text).to.equal("No promo code");
        expect(lineItem.price).to.equal(0);
    });
});
describe("OrderPromoFactory test", function(){
    var scope;
    beforeEach(module("myApp"));
    beforeEach(inject(function ($controller, $rootScope, OrderPromoFactory) {
        scope = $rootScope.$new();
        var opf = OrderPromoFactory;

        var createController = function () {

            return $controller('OrderPromoController', {
                '$scope': scope,
                'OrderPromoFactory': opf
            });
        };
        createController();
    }));

    it("should initialize a model", function () {
        expect(scope.model).to.be.ok;
    });

    it("should initialize the right model", function () {
        expect(scope.model.promos.length).to.equal(2);
    });
});