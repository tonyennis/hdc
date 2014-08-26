/**
 * Created by Tony on 8/25/2014.
 */
'use strict';

describe("BackingFabricDirective", function () {
    var element,
        $scope;

    beforeEach(module("myApp.controllers"));
    beforeEach(module("myApp.order_tabs"));
    beforeEach(module("partials/backing_fabric_picker.html"));

    beforeEach(inject(function ($compile, $rootScope) {
        $scope = $rootScope;
        element = angular.element("<backing-fabric></backing-fabric>");
        $compile(element)($rootScope);
        $scope.$digest();
    }));
    it("should compile", function () {
        console.log(element.html());
        expect(element.children('table')).to.be.ok;
    });
    it("should have rows", function(){
        expect(element.children('table').children('tr').length).to.equal(8);
    });
});