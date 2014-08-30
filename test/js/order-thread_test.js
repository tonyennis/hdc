/**
 * Created by Tony on 8/29/2014.
 */

describe("OrderThreadFactory tests", function(){
    var fac;

    beforeEach(module("myApp"));
    beforeEach(inject(function (OrderThreadFactory) {
        fac = OrderThreadFactory;
    }));

    it("should produce a name", function(){
        fac.thread = 0;
        expect(fac.name()).to.equal("Solid");
    });
    it("should produce a line item", function(){
        fac.thread = 1;
        var lineItem = fac.lineItem();
        expect(lineItem.text).to.equal("Variegated");
        expect(lineItem.price).to.equal(5);
    });
});
describe("OrderThreadController test", function(){
    var scope;
    beforeEach(module("myApp"));
    beforeEach(inject(function ($controller, $rootScope, OrderThreadFactory) {
        scope = $rootScope.$new();
        var otf = OrderThreadFactory;

        var createController = function () {

            return $controller('OrderThreadController', {
                '$scope': scope,
                'OrderThreadFactory': otf
            });
        };
        createController();
    }));

    it("should initialize a model", function () {
        expect(scope.model).to.be.ok;
    });

    it("should initialize the right model", function () {
        expect(scope.model.threads.length).to.equal(2);
    });
});