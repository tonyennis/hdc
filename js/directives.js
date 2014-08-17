'use strict';

/* Directives */

angular.module('myApp.directives', [])
    .directive('sampleQuilt', function () {
        return {
            restrict: 'E',
            scope: { imgPath: "@", text: "@"  },
            templateUrl: 'partials/sample_quilt.html'
        };
    });

