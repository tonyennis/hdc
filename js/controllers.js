'use strict';

/* Controllers */
angular.module('myApp.controllers', [])
    .controller('PageSelectionController', [ function () {
        var pages = {
            'home': 'partials/home.html',
            'about': 'partials/about.html',
            'samples': 'partials/samples.html',
            'quilt info': 'partials/quilt_info.html',
            'order': 'partials/order.html',
            'contact us': 'partials/contact_us.html'
        };

        this.current_page = 'home';
        this.setPage = function (page) {
            this.current_page = page;
        };
        this.getPage = function () {
            return this.current_page;
        };
        this.getPartial = function () {
            return pages[this.getPage()] || pages['home'];
        };
    }])
    .controller('PricelistController', [function () {
        this.header = [
            "# of Blocks", "Arrangement of Blocks", "Approx. Size", "Price", "Additional Price of Sashing"
        ];
        this.prices =
            [
                {blocks: 9, block_size: "3 x 3", dimension: "3’ 9\" x 3’9\"", price: 75, sashing: 25},
                {blocks: 12, block_size: "3 x 4", dimension: "3' 9\" x 5' 0\"", price: 82, sashing: 38},
                {blocks: 15, block_size: "3 x 5", dimension: "3' 9\" x 6' 0\"", price: 92, sashing: 48},
                {blocks: 16, block_size: "4 x 4", dimension: "5' 0\" x 5' 0\"", price: 100, sashing: 50},
                {blocks: 20, block_size: "4 x 5", dimension: "5' 0\" x 6' 3\"", price: 113, sashing: 57},
                {blocks: 24, block_size: "4 x 6", dimension: "5' 0\" x 7' 6\"", price: 125, sashing: 85},
                {blocks: 25, block_size: "5 x 5", dimension: "6' 3\" x 6' 3\"", price: 142, sashing: 88},
                {blocks: 30, block_size: "5 x 6", dimension: "6' 3\" x 7' 6\"", price: 180, sashing: 95},
                {blocks: 35, block_size: "5 x 7", dimension: "6' 3\" x 8' 9\"", price: 195, sashing: 110},
                {blocks: 36, block_size: "6 x 6", dimension: "7' 6\" x 7' 6\"", price: 205, sashing: 130},
                {blocks: 42, block_size: "6 x 7", dimension: "7' 6\" x 8' 9\"", price: 225, sashing: 150},
                {blocks: 49, block_size: "7 x 7", dimension: "8' 9\" x 8' 9\"", price: 260, sashing: 170}
            ];
    }])
;