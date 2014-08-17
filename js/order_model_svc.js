angular.module("myApp.services", [])
    .factory('OrderModelSvc', [  function () {

        var header = {
            blocks: "# of Blocks",
            block_size: "Arrangement of Blocks",
            dimension: "Approx. Size",
            price: "Price",
            sashing: "Additional Price of Sashing"
        };

        var sizes =
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

        var backingFabrics = [
            {text: "Dark Red", color: "#990000"},
            {text: "Dark Blue", color: "#333399"},
            {text: "Black", color: "#000000"},
            {text: "Brown", color: "#663333"},
            {text: "Pale Green", color: "#99cc66"},
            {text: "Light Blue", color: "#6699ff"},
            {text: "Tan", color: "#cccc66"},
            {text: "Red", color: "#cc3300"}
        ];

        var threads = [
            {text: "Solid", img: "img/solid.png", price: 0, narrative: "Standard thread"},
            {text: "Variegated", img: "img/variegated.png", price: 5, narrative: "Upgrade to variegated thread"}
        ];

        var promos = [
            {text: "Zappa", price: -5},
            {text: "Setzer", price: -10}
        ];

        var size = null;
        var lineItems = [];
        var backingColor = null;
        var sashing = null;
        var thread = null;
        var shipping = 18;
        var promo = null;
        //var promoCode = NaN; // This means no promo code */

        return {

            setSize: function (s) {
                size = s;
            },
            getSize: function () {
                return size;
            },
            setBackingColor: function (b) {
                backingColor = b;
            },

            setSashing: function (s) {
                sashing = s;
            },
            setThread: function (t) {
                thread = t;
            },

            getBackingColors: function () {
                return backingFabrics;
            },
            getBackingColor: function () {
                return backingColor ? backingFabrics[backingColor].color : "?";
            },
            getVariegatedThreadPrice: function () {
                return threads[1].price;
            },
            getThreads: function () {
                return threads;
            },
            getSizes: function () {
                return sizes;
            },
            getHeader: function () {
                return header;
            },

            applyPromoCode: function () {
                var i;
                for (i = 0; i < promos.length; i++) {
                    if (promos[i].text.toLowerCase() == promoCode.toLowerCase()) {
                        promo = i;
                        break;
                    }
                }
                this.genLineItems();
            },

            getDescriptionNarrative: function () {
                var dimension = sizes[size].dimension;
                dimension = dimension.replace("x", "wide by");
                dimension = dimension + " long";

                return    "Your quilt will be made from "
                    + sizes[size].blocks
                    + " t-shirts arranged in a "
                    + sizes[size].block_size
                    + " rectangle and will measure about "
                    + dimension
                    + ". We'll back"
                    + ((sashing) ? " and sash" : "" )
                    + " it with a "
                    + backingFabrics[backingColor].text.toLowerCase()
                    + " fabric and quilt it using a "
                    + threads[thread].text.toLowerCase()
                    + " thread."
                    ;
            },

            getSashingPrice: function () {
                return sizes[size].sashing;
            },

            genLineItems: function () {
                var total = 0;
                lineItems = [];


                lineItems.push({text: "Your quilt will be " + sizes[size].block_size + " squares", price: sizes[size].price});
                total = sizes[size].price;

                lineItems.push({text: threads[thread].narrative, price: threads[thread].price});
                total = total + threads[thread].price;

                if (sashing) {
                    lineItems.push({text: "Add sashing", price: sizes[size].sashing});
                    total = total + sizes[size].sashing;
                }
                else {
                    lineItems.push({text: "No sashing", price: 0});
                }

                if (isNaN(promo)) {
                    lineItems.push({text: "No promo code", price: 0});
                }
                else {
                    lineItems.push({text: "Promo code", price: promos[promo].price});
                    total = total + promos[promo].price;
                }

                lineItems.push({text: "Shipping", price: shipping});
                total = total + shipping;

                lineItems.push({text: "Order Total", price: total});
                return lineItems;

            }
        };
    }]);
