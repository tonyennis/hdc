
header = {
		blocks:"# of Blocks",
		block_size:"Arrangement of Blocks",
		dimension:"Approx. Size",
		price:"Price",
		sashing:"Additional Price of Sashing"
		};

sizes =
		[
		{blocks:9, block_size:"3 x 3", dimension:"3’ 9\" x 3’9\"", price:75, sashing:25},
		{blocks:12,block_size: "3 x 4", dimension:"3' 9\" x 5' 0\"",  price:82, sashing:38},
		{blocks:15, block_size:"3 x 5", dimension:"3' 9\" x 6' 0\"", price:92, sashing:48},
		{blocks:16, block_size:"4 x 4", dimension:"5' 0\" x 5' 0\"", price:100, sashing:50},
		{blocks:20, block_size:"4 x 5", dimension:"5' 0\" x 6' 3\"", price:113, sashing:57},
		{blocks:24, block_size:"4 x 6", dimension:"5' 0\" x 7' 6\"", price:125, sashing:85},
		{blocks:25, block_size:"5 x 5", dimension:"6' 3\" x 6' 3\"", price:142, sashing:88},
		{blocks:30, block_size:"5 x 6", dimension:"6' 3\" x 7' 6\"", price:180, sashing:95},
		{blocks:35, block_size:"5 x 7", dimension:"6' 3\" x 8' 9\"", price:195, sashing:110},
		{blocks:36, block_size:"6 x 6", dimension:"7' 6\" x 7' 6\"", price:205, sashing:130},
		{blocks:42, block_size:"6 x 7", dimension:"7' 6\" x 8' 9\"", price:225, sashing:150},
		{blocks:49, block_size:"7 x 7", dimension:"8' 9\" x 8' 9\"", price:260, sashing:170}
		];
		
var backingFabrics = [
	{text:"Dark Red", color:"#990000"},
	{text:"Dark Blue", color:"#333399"},
	{text:"Black", color:"#000000"},
	{text:"Brown", color:"#663333"},
	{text:"Pale Green", color:"#99cc66"},
	{text:"Light Blue", color:"#6699ff"},
	{text:"Tan", color:"#cccc66"},
	{text:"Red", color:"#cc3300"}
	];

threads = [
	{text:"Solid", img:"img/solid.png", price: 0, narrative: "Standard thread"},
	{text:"Variegated", img: "img/variegated.png", price: 5, narrative: "Upgrade to variegated thread"}
	];
	
promos = [
	{text:"Zappa", price:-5},
	{text:"Setzer", price:-10}
	];


	
function OrderModel() {
	this.lineItems = [];
	this.size = NaN;
	this.backingColor = NaN;
	this.sashing = NaN;	/* false means no sashing */
	this.thread = NaN;
	this.shipping = 18;
	this.promo = NaN;			/* This means no promo code */
	this.promoCode = "";

	this.setSize = function(s) { this.size = s; };
	this.setBackingColor = function(b) { this.backingColor = b; };
	this.setSashing = function(s) { this.sashing = s; };
	this.setThread = function(t) { this.thread = t; };
	
	this.getBackingColors = function() { return backingFabrics; };
	this.getBackingColor = function() {return backingFabrics[this.backingColor].color; };
	this.getVariegatedThreadPrice = function() {return threads[1].price};
	this.getThreads = function() { return threads; };
	this.getSizes = function() { return sizes; };
	this.getHeader = function() { return header; };
	
	this.applyPromoCode = function() {
		var i;
		this.promo = NaN;
		for(i=0; i<promos.length; i++) {
			if (promos[i].text.toLowerCase() == this.promoCode.toLowerCase()) {
				this.promo = i;
				break;
				}
			}
		this.genLineItems();
		};
		
	this.getDescriptionNarrative = function() {
		dimension = sizes[this.size].dimension;
		dimension = dimension.replace("x", "wide by");
		dimension = dimension + " long";

		return	"Your quilt will be made from "
			+ sizes[this.size].blocks
			+ " t-shirts arranged in a "
			+ sizes[this.size].block_size
			+ " rectangle and will measure about "
			+ dimension 
			+ ". We'll back"
			+ ((this.sashing) ? " and sash" : "" )
			+ " it with a "
			+ backingFabrics[this.backingColor].text.toLowerCase() 
			+ " fabric and quilt it using a "
			+ threads[this.thread].text.toLowerCase() 
			+ " thread."
			;
	};
	
	this.getSashingPrice = function() {
		return sizes[this.size].sashing;
	};
		
	this.genLineItems = function() {
		var total = 0;
		this.lineItems = [];

		
		this.lineItems.push({text:"Your quilt will be "+sizes[this.size].block_size+" squares", price:sizes[this.size].price});
		total = sizes[this.size].price;
	
		this.lineItems.push({text: threads[this.thread].narrative, price:threads[this.thread].price});
		total = total + threads[this.thread].price;

		if (this.sashing) {
			this.lineItems.push({text:"Add sashing", price: this.getSashingPrice()});
			total = total + sizes[this.size].sashing;
			}
		else {
			this.lineItems.push({text:"No sashing", price:0});
			}
			
		if(isNaN(this.promo)) {
			this.lineItems.push({text:"No promo code", price:0});
			}
		else {
			this.lineItems.push({text:"Promo code", price: promos[this.promo].price});
			total = total + promos[this.promo].price;
			}
			
		this.lineItems.push({text:"Shipping", price:this.shipping});
		total = total + this.shipping;
		
		this.lineItems.push({text:"Order Total", price:total});
		return this.lineItems;
	
	};
}
