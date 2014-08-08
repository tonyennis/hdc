'use strict';

/* Directives */

angular.module('myApp.tab_member', [])
    .directive('tab', function () {
        return {
            restrict: 'E',
            scope: {
                target: "=target",
                text: "=text"
            },
            templateUrl: '../partials/tab_member.html'
        };
    });
