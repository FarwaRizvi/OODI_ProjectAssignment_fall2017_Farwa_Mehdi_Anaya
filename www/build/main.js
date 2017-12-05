webpackJsonp([0],{

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Order; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AddAddress_AddAddress__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_shopping_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_analytics__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_MyErrorHandler__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var Order = (function () {
    function Order(handler, platform, ga, alertCtrl, shoppingcart, navCtrl, navParams) {
        this.handler = handler;
        this.platform = platform;
        this.ga = ga;
        this.alertCtrl = alertCtrl;
        this.shoppingcart = shoppingcart;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.Order = [];
        this.CopyCart = [];
        this.ios_css = false;
        if (this.platform.is('ios')) {
            this.ios_css = true;
        }
        else {
            this.ios_css = false;
        }
        this.Subtotal = 0;
        this.Amount = 0;
    }
    Order.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.ga.trackView('Order Page');
        })
            .catch(function (e) {
            _this.handler.handleError('Error starting GoogleAnalytics : ' + e);
        });
    };
    Order.prototype.ionViewDidLoad = function () {
        this.Order = this.shoppingcart.getShoppingCart();
        for (var i = 0; i < this.Order.length; i++) {
            this.Subtotal = this.Subtotal + this.Order[i]['total'];
        }
        this.Subtotal = Math.round(this.Subtotal * 100) / 100;
        this.TotalAmount(this.Subtotal);
    };
    Order.prototype.Continue = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__AddAddress_AddAddress__["a" /* AddAddress */], {}, { animate: false });
    };
    Order.prototype.BackPage = function () {
        this.navCtrl.pop({ animate: false });
    };
    Order.prototype.Plus = function (dish_id, dish_price, dish_qty) {
        this.Order = this.shoppingcart.PlusQuantity(dish_id);
        var number = 0;
        for (var i = 0; i < this.Order.length; i++) {
            number = number + (this.Order[i]['dish_price'] * this.Order[i]['dish_qty']);
        }
        this.Subtotal = number;
        this.Subtotal = Math.round(this.Subtotal * 100) / 100;
        this.TotalAmount(this.Subtotal);
    };
    Order.prototype.Minus = function (dish_id, dish_price, dish_qty) {
        if (dish_qty > 1) {
            this.Order = this.shoppingcart.MinusQuantity(dish_id);
            var number = 0;
            for (var i = 0; i < this.Order.length; i++) {
                number = number + (this.Order[i]['dish_price'] * this.Order[i]['dish_qty']);
            }
            this.Subtotal = number;
            this.Subtotal = Math.round(this.Subtotal * 100) / 100;
            this.TotalAmount(this.Subtotal);
        }
    };
    Order.prototype.RemoveItem = function (dish_id, total) {
        this.Order = this.shoppingcart.RemoveFromCart(dish_id);
        var number = 0;
        for (var i = 0; i < this.Order.length; i++) {
            number = number + (this.Order[i]['dish_price'] * this.Order[i]['dish_qty']);
        }
        this.Subtotal = number;
        this.Subtotal = Math.round(this.Subtotal * 100) / 100;
        this.TotalAmount(this.Subtotal);
        if (this.Subtotal == 0 && this.Order.length == 0) {
            this.BasketEmpty();
        }
    };
    Order.prototype.BasketEmpty = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Basket is Empty',
            subTitle: 'You have to add something first',
            buttons: [{
                    text: 'OK',
                    handler: function () {
                        _this.navCtrl.pop({ animate: false });
                    }
                }]
        });
        alert.present();
    };
    Order.prototype.TotalAmount = function (subtotal) {
        var percent = Number(0.12) * Number(subtotal);
        var number = percent + Number(subtotal) + 10;
        this.Amount = Math.round(number * 100) / 100;
        ;
    };
    return Order;
}());
Order = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-order',template:/*ion-inline-start:"F:\SubWay\SubWay\src\pages\order\order.html"*/'<ion-header *ngIf="!ios_css">\n  <ion-toolbar color="title" no-padding>\n    <ion-grid no-padding>\n      <ion-row align-items-center>\n        <ion-col col-1>\n            <button ion-button clear class="BackPageButton" Style="color:white;" left (click)="BackPage()">\n              <ion-icon style="zoom:1.7;" name="ios-arrow-back"></ion-icon>\n            </button>\n        </ion-col>\n        <ion-col col-9>\n            <ion-title style="text-align:center;" no-padding>\n                 <img class="logotitle" src="assets/App-Logo.png"/>\n            </ion-title>\n        </ion-col>\n        <ion-col col-1>\n        </ion-col>\n        <ion-col col-1>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-toolbar>\n</ion-header>\n\n<ion-header *ngIf="ios_css">\n  <ion-toolbar color="title" no-padding>\n    <ion-grid no-padding>\n      <ion-row align-items-center>\n        <ion-col col-1>\n            <button ion-button clear class="BackButton" left (click)="BackPage()">\n              <ion-icon style="zoom:1.7;" name="ios-arrow-back"></ion-icon>\n            </button>\n        </ion-col>\n        <ion-col col-9>\n               <img class="logotitle_ios" src="assets/App-Logo.png"/>\n        </ion-col>\n        <ion-col col-1>\n        </ion-col>\n        <ion-col col-1>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content padding>\n\n  <span class="Span_padding_OrderPage">\n    <ion-row class="zero-padding hr-list2">\n            <ion-col col-5>\n                  <p class="Detail_Text CenterAlign">  Your Order </p>\n            </ion-col>\n\n            <ion-col col-3>\n                    <p class="Detail_Text CenterAlign">  Quantity </p>\n             </ion-col>\n\n             <ion-col col-lg-2>\n                     <p class="Detail_Text CenterAlign" style="text-align:left;padding-left:6px;">  Price </p>\n             </ion-col>\n\n             <ion-col col-sm-2>\n             </ion-col>\n    </ion-row>\n  </span>\n\n  <span class="Nutrients-colored-span" style="background:#F4F0F0;margin-top:4px;margin-bottom:4px;display:inline-table;" *ngFor="let i of Order">\n          <ion-row class="zero-padding" align-items-center>\n                  <ion-col col-5>\n                          <p class="Detail_Text zero-padding" Style="text-align:left;padding-left:0px;"> {{i.dish_name}} </p>\n                  </ion-col>\n\n                  <ion-col col-3>\n                          <p class="Detail_Text zero-padding" Style="text-align:right;padding-left:0px; padding-right:0px;">\n                            <ion-grid no-padding class="QuantityGrid2">\n                                    <ion-row no-padding>\n                                          <ion-col col-4>\n                                                <button ion-button class="QuantityButton" small color="title" (click)="Minus(i.dish_id,i.dish_price,i.dish_qty)">\n                                                    <ion-icon name="remove"></ion-icon>\n                                                </button>\n                                          </ion-col>\n                                          <ion-col col-4>\n                                            <p class="Qty_Label" style="margin-top:3.5px;"> {{i.dish_qty}} </p>\n                                          </ion-col>\n                                          <ion-col col-4>\n                                                <button ion-button class="QuantityButton" small color="title" (click)="Plus(i.dish_id,i.dish_price,i.dish_qty)">\n                                                    <ion-icon name="add"></ion-icon>\n                                                </button>\n                                          </ion-col>\n                                    </ion-row>\n                            </ion-grid>\n                          </p>\n                   </ion-col>\n\n                   <ion-col col-lg-2 style="margin:0px;padding:0px;">\n                           <p class="Detail_Text zero-padding totaltext"> ${{i.total}} </p>\n                   </ion-col>\n\n                   <ion-col col-sm-2 style="margin:0px;padding:0px;">\n                           <ion-icon color="grey" name="md-close-circle" style="zoom:1.3;margin-top:3px;" (click)="RemoveItem(i.dish_id,i.total)"></ion-icon>\n                   </ion-col>\n          </ion-row>\n  </span>\n\n  <span class="Span_padding_OrderPage">\n      <div class="hr-list2">\n          <span style="display:-webkit-box;">\n              <p class="Detail_Text LeftAlign" style="width: 100%;">\n                <ion-icon color="title" name="md-add-circle" style="zoom:1.35;" (click)="BackPage()">\n                  <p class="AddMoreText">\n                    Add more items\n                  </p>\n                </ion-icon>\n              </p>\n          </span>\n      </div>\n      <div class="hr-list2">\n          <span style="display:-webkit-box;">\n              <p class="Detail_Text LeftAlign"> Subtotal </p>\n              <p class="Detail_Text RightAlign"> ${{Subtotal}} </p>\n          </span>\n\n          <span style="display:-webkit-box;">\n              <p class="Detail_Text LeftAlign">Service fee</p>\n              <p class="Detail_Text RightAlign"> $10</p>\n          </span>\n\n          <span style="display:-webkit-box;">\n              <p class="Detail_Text LeftAlign">VAT Tax</p>\n              <p class="Detail_Text RightAlign">%12</p>\n          </span>\n      </div>\n      <span style="display:-webkit-box;">\n          <p class="Detail_Text LeftAlign">Total Amount</p>\n          <p class="Detail_Text RightAlign">${{Amount}}</p>\n      </span>\n   </span>\n</ion-content>\n\n<ion-footer no-lines no-border class="zero-padding" color="white">\n    <span Style="margin=0px; padding: 7px 25px 10px 25px;; display:block; background:white;">\n      <button ion-button class="button_text" block (click)="Continue()"> Continue </button>\n    </span>\n</ion-footer>\n'/*ion-inline-end:"F:\SubWay\SubWay\src\pages\order\order.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__providers_MyErrorHandler__["a" /* MyErrorHandler */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_analytics__["a" /* GoogleAnalytics */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3__providers_shopping_service__["a" /* ShoppingServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
], Order);

//# sourceMappingURL=order.js.map

/***/ }),

/***/ 108:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopoverPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__my_orders_my_orders__ = __webpack_require__(206);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PopoverPage = (function () {
    function PopoverPage(viewCtrl, navCtrl, navParams) {
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    PopoverPage.prototype.close = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__my_orders_my_orders__["a" /* MyOrders */], {}, { animate: false });
        this.viewCtrl.dismiss();
    };
    return PopoverPage;
}());
PopoverPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-popover',template:/*ion-inline-start:"F:\SubWay\SubWay\src\pages\popover\popover.html"*/'<ion-list no-lines no-padding class="zero-padding">\n     <button ion-item (click)="close()"> My Order </button>\n</ion-list>\n'/*ion-inline-end:"F:\SubWay\SubWay\src\pages\popover\popover.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
], PopoverPage);

//# sourceMappingURL=popover.js.map

/***/ }),

/***/ 117:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 117;

/***/ }),

/***/ 159:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 159;

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenusPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__item_details_item_details__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_shopping_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__order_order__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__popover_popover__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_google_analytics__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_MyErrorHandler__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_service__ = __webpack_require__(27);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var MenusPage = (function () {
    function MenusPage(service, handler, platform, ga, alertCtrl, popoverCtrl, shoppingcart, loadingCtrl, navCtrl, navParams) {
        this.service = service;
        this.handler = handler;
        this.platform = platform;
        this.ga = ga;
        this.alertCtrl = alertCtrl;
        this.popoverCtrl = popoverCtrl;
        this.shoppingcart = shoppingcart;
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.form = {};
        this.boolMessage = false;
        this.boolError = false;
        this.ios_css = false;
        this.boolQty = false;
        if (this.platform.is('ios')) {
            this.ios_css = true;
        }
        else {
            this.ios_css = false;
        }
        this.loadMenu();
    }
    MenusPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.ga.trackView('Menu Page');
        })
            .catch(function (e) {
            _this.handler.handleError('Error starting GoogleAnalytics : ' + e);
        });
        this.Qty = this.shoppingcart.getQuantity();
        if (this.Qty == 0) {
            this.boolQty = false;
        }
        else {
            this.boolQty = true;
        }
    };
    MenusPage.prototype.BasketEmpty = function () {
        var alert = this.alertCtrl.create({
            title: 'Basket is Empty',
            subTitle: 'You have to add something first',
            buttons: ['OK']
        });
        alert.present();
    };
    MenusPage.prototype.presentPopover = function (myEvent) {
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_5__popover_popover__["a" /* PopoverPage */], {}, { cssClass: 'abc' });
        popover.onDidDismiss(function (data) {
        });
        popover.present({
            ev: myEvent
        });
    };
    MenusPage.prototype.CartIcon = function () {
        if (this.Qty == 0) {
            this.BasketEmpty();
        }
        else {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__order_order__["a" /* Order */], {}, { animate: false });
        }
    };
    MenusPage.prototype.Reload = function () {
        this.loadMenu();
    };
    MenusPage.prototype.loadMenu = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: ' Loading...',
        });
        loading.present()
            .then(function () {
            var form2 = _this.service.loadMenu();
            console.log(form2);
            if (!(form2['data'] === undefined || form2['data'] === null || form2['data'] === [] || form2['data'] === '')) {
                _this.form = form2['data'];
                _this.form['categories'] = _this.form['menu']['categories'];
                _this.boolMessage = false;
                _this.boolError = false;
                loading.dismiss();
            }
            else if (!(form2['message'] === undefined || form2['message'] === null || form2['message'] === [] || form2['message'] === '')) {
                _this.boolMessage = true;
                _this.boolError = false;
                _this.Message = form2['message'];
                loading.dismiss();
            }
            else {
                _this.boolError = true;
                _this.boolMessage = true;
                _this.Message = form2['CustomError'];
                loading.dismiss();
            }
        });
    };
    MenusPage.prototype.ItemDetails = function (id) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__item_details_item_details__["a" /* ItemDetails */], { Dish_ID: id }, { animate: false });
    };
    MenusPage.prototype.ItemDetailsSubItems = function (item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__item_details_item_details__["a" /* ItemDetails */], { Item: item }, { animate: false });
    };
    MenusPage.prototype.BackPage = function () {
        this.navCtrl.pop({ animate: false });
    };
    return MenusPage;
}());
MenusPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-menus',template:/*ion-inline-start:"F:\SubWay\SubWay\src\pages\menus\menus.html"*/'<ion-header *ngIf="!ios_css">\n  <ion-toolbar color="title" no-padding>\n    <ion-grid no-padding>\n      <ion-row align-items-center>\n        <ion-col col-1>\n            <button ion-button clear class="BackPageButton" Style="color:white;" left (click)="BackPage()">\n              <ion-icon style="zoom:1.7;" name="ios-arrow-back"></ion-icon>\n            </button>\n        </ion-col>\n        <ion-col col-9>\n            <ion-title style="text-align:center;" no-padding>\n                 <img class="logotitle" src="assets/App-Logo.png"/>\n            </ion-title>\n        </ion-col>\n        <ion-col col-1>\n            <ion-title class="titlecart" no-padding *ngIf="boolQty">\n            		 <img (click)="CartIcon()" class="carticon" src="assets/cart1.png"/>\n                 <p (click)="CartIcon()" class="imgcart"> {{Qty}} </p>\n        	  </ion-title>\n            <ion-title class="titlecart" no-padding *ngIf="!boolQty">\n            		 <img (click)="CartIcon()" class="carticon" src="assets/cart1.png"/>\n        	  </ion-title>\n        </ion-col>\n        <ion-col col-1>\n            <button ion-button clear color="white" right class="popoverbutton" (click)="presentPopover($event)">\n              <ion-icon style="zoom:1.7;" name="md-more"></ion-icon>\n            </button>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-toolbar>\n</ion-header>\n\n<ion-header *ngIf="ios_css">\n  <ion-toolbar color="title" no-padding>\n    <ion-grid no-padding>\n      <ion-row align-items-center>\n        <ion-col col-1>\n            <button ion-button clear class="BackButton" left (click)="BackPage()">\n              <ion-icon style="zoom:1.7;" name="ios-arrow-back"></ion-icon>\n            </button>\n        </ion-col>\n        <ion-col col-9>\n               <img class="logotitle_ios" src="assets/App-Logo.png"/>\n        </ion-col>\n        <ion-col col-1 *ngIf="boolQty">\n            		 <img (click)="CartIcon()" class="carticon" src="assets/cart1.png"/>\n                 <p (click)="CartIcon()" class="imgcart"> {{Qty}} </p>\n       </ion-col>\n        <ion-col col-1 *ngIf="!boolQty">\n            		 <img (click)="CartIcon()" class="carticon" src="assets/cart1.png"/>\n        </ion-col>\n        <ion-col col-1>\n            <button ion-button clear color="white" right class="popoverbutton" (click)="presentPopover($event)">\n              <ion-icon style="zoom:1.7;" name="md-more"></ion-icon>\n            </button>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content padding style="background: #F4F0F0;">\n	<div class="SpanHeader_List">\n		<p class="Status" *ngIf="!form.status==\'\'||!form.status==null||!form.status==undefined"> {{form.status}} </p>\n    	<div class="inner2">\n		        <img class="img2" [src]="form.image_uri" onError="this.src=\'assets/image_P2.jpg\';" alt="" />\n		</div>\n		<div Style="padding-left:90px;padding-top:10px;">\n                <span style="display:table;">\n                    <div class="stars">\n                        <ion-icon color="gold" name="ios-star"></ion-icon>\n                        <ion-icon color="gold" name="ios-star"></ion-icon>\n                        <ion-icon color="gold" name="ios-star"></ion-icon>\n                        <ion-icon color="gold" name="ios-star"></ion-icon>\n                        <ion-icon color="grey" name="ios-star"></ion-icon>\n                    </div>\n                    <p class="Rating"> (112 rating)</p>\n                </span>\n                <span class="RestaurantName">\n                            {{form.name}}\n                </span>\n                <span class="HeaderInfo">\n                            {{form.info}}\n                </span>\n         </div>\n         <span class="Span_List_Items_Description" style="padding-top:0px;margin:0px 10px 10px 10px;font-size:13.5px;max-height:71px;">\n                {{form.description}}\n         </span>\n    </div>\n\n    <div class="Span_List" *ngFor="let category of form.categories">\n        <dl>\n			<div>\n			   		<dt> {{category.title}} </dt>\n\n				    <span *ngFor="let i of category.items">\n						    <span *ngIf="i.type==\'dish\'">\n							    <span class="Span_List_Items hr-list" (click)="ItemDetails(i.id)">\n					        		<p class="Price"> ${{i.price}} </p>\n					        		<span class="span_button_icon">\n					                     <ion-icon name="ios-arrow-forward" color="orange" item-right></ion-icon>\n					                </span>\n					                <div class="inner">\n					                       <img class="img1" [src]="i.image" onError="this.src=\'assets/image_P2.jpg\';" alt="" />\n					                </div>\n					                <div Style="padding-left:90px;">\n					                    <span class="Span_List_Items_Title">\n					                            {{i.title}}\n					                    </span>\n					                    <span class="Span_List_Items_Description">\n					                            {{i.description}}\n					                    </span>\n					                </div>\n					        	</span>\n				        	</span>\n\n				        	<span *ngIf="i.type==\'deal\'">\n					        	<span class="Span_List_Items hr-list" (click)="ItemDetailsSubItems(i)">\n					        		<p class="Price"> ${{i.price}} </p>\n					        		<span class="span_button_icon">\n					                     <ion-icon name="ios-arrow-forward" color="orange" item-right></ion-icon>\n					                </span>\n					                <div class="inner">\n					                       <img class="img1" [src]="i.image" onError="this.src=\'assets/image_P2.jpg\';" alt="" />\n					                </div>\n					                <div Style="padding-left:95px;">\n					                    <span class="Span_List_Items_Title">\n					                            {{i.title}}\n					                    </span>\n					                    <span class="Span_List_Items_Description">\n					                            {{i.description}}\n					                    </span>\n					                </div>\n					        	</span>\n				        	</span>\n		        	</span>\n			</div>\n		</dl>\n    </div>\n\n\n    <span *ngIf="boolMessage" class="MessageContainer">\n        <p class="Message">{{Message}}</p>\n        <p Style="text-align:center; margin=0px; padding: 7px 25px 7px 25px; display:block;" *ngIf="boolError">\n          <button ion-button class="button_text" (click)="Reload()"> RETRY </button>\n        </p>\n    </span>\n</ion-content>\n'/*ion-inline-end:"F:\SubWay\SubWay\src\pages\menus\menus.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_8__providers_service__["a" /* ServiceProvider */], __WEBPACK_IMPORTED_MODULE_7__providers_MyErrorHandler__["a" /* MyErrorHandler */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_google_analytics__["a" /* GoogleAnalytics */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* PopoverController */], __WEBPACK_IMPORTED_MODULE_3__providers_shopping_service__["a" /* ShoppingServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
], MenusPage);

//# sourceMappingURL=menus.js.map

/***/ }),

/***/ 20:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyErrorHandler; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_analytics__ = __webpack_require__(19);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MyErrorHandler = (function (_super) {
    __extends(MyErrorHandler, _super);
    function MyErrorHandler(ga) {
        var _this = _super.call(this) || this;
        _this.ga = ga;
        _this.ga.enableUncaughtExceptionReporting(true).then(function (res) { console.log(res); });
        return _this;
    }
    MyErrorHandler.prototype.handleError = function (err) {
        try {
            this.ga.trackEvent('error handler', err);
            console.error(err);
        }
        catch (e) {
            this.ga.trackEvent('error handler', e);
            console.error(e);
        }
    };
    MyErrorHandler.prototype.logError = function (error) {
        var date = new Date().toISOString();
        if (error instanceof TypeError) {
            this.ga.trackEvent('error handler', error.message);
            console.error("Error Here");
        }
        else if (error instanceof Error) {
            this.ga.trackEvent('error handler', error.message);
            console.error("Error Here");
        }
        else {
            this.ga.trackEvent('error handler', error);
            console.error("Error Here");
        }
    };
    return MyErrorHandler;
}(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicErrorHandler */]));
MyErrorHandler = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_native_google_analytics__["a" /* GoogleAnalytics */]])
], MyErrorHandler);

//# sourceMappingURL=MyErrorHandler.js.map

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ItemDetails; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_shopping_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__order_order__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__popover_popover__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_google_analytics__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_MyErrorHandler__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_service__ = __webpack_require__(27);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ItemDetails = (function () {
    function ItemDetails(service, handler, platform, ga, alertCtrl, popoverCtrl, shoppingcart, loadingCtrl, navCtrl, navParams) {
        this.service = service;
        this.handler = handler;
        this.platform = platform;
        this.ga = ga;
        this.alertCtrl = alertCtrl;
        this.popoverCtrl = popoverCtrl;
        this.shoppingcart = shoppingcart;
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.form = {};
        this.Allergen = false;
        this.Nutrients = false;
        this.Description = false;
        this.SubItems = false;
        this.boolMessage = false;
        this.boolError = false;
        this.ios_css = false;
        this.boolQty = false;
        if (this.platform.is('ios')) {
            this.ios_css = true;
        }
        else {
            this.ios_css = false;
        }
        this.Dish_ID = navParams.get('Dish_ID');
        this.Item = navParams.get('Item');
        this.form['image'] = "assets/image-placeholder.jpg";
        this.quantity = 1;
        if (this.Item == undefined || this.Item == null) {
            this.type = 'dish';
            this.SubItems = false;
            this.Description = true;
            this.LoadDetails(this.Dish_ID);
        }
        else {
            this.Dish_ID = this.Item['id'];
            this.type = 'deal';
            this.loadItem(this.Item);
        }
    }
    ItemDetails.prototype.BasketEmpty = function () {
        var alert = this.alertCtrl.create({
            title: 'Basket is Empty',
            subTitle: 'You have to add something first',
            buttons: ['OK']
        });
        alert.present();
    };
    ItemDetails.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.ga.trackView('Item Details Page');
        })
            .catch(function (e) {
            _this.handler.handleError('Error starting GoogleAnalytics : ' + e);
        });
        this.Qty = this.shoppingcart.getQuantity();
        if (this.Qty == 0) {
            this.boolQty = false;
        }
        else {
            this.boolQty = true;
        }
    };
    ItemDetails.prototype.CartIcon = function () {
        if (this.Qty == 0) {
            this.BasketEmpty();
        }
        else {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__order_order__["a" /* Order */], {}, { animate: false });
        }
    };
    ItemDetails.prototype.Reload = function () {
        if (this.Item == undefined || this.Item == null) {
            this.type = 'dish';
            this.SubItems = false;
            this.Description = true;
            this.LoadDetails(this.Dish_ID);
        }
        else {
            this.Dish_ID = this.Item['id'];
            this.type = 'deal';
            this.loadItem(this.Item);
        }
    };
    ItemDetails.prototype.presentPopover = function (myEvent) {
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_4__popover_popover__["a" /* PopoverPage */]);
        popover.present({
            ev: myEvent
        });
    };
    ItemDetails.prototype.LoadDetails = function (dish_id) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: ' Loading...',
        });
        loading.present()
            .then(function () {
            var form2 = _this.service.ItemDetails(dish_id);
            console.log(form2);
            if (!(form2['data'] === undefined || form2['data'] === null || form2['data'] === [] || form2['data'] === '')) {
                _this.form = form2['data'];
                _this.form['image'] = _this.form['images']['full'];
                _this.Total = _this.form['price'];
                if (_this.form['allergens'] == null || _this.form['allergens'] == undefined || _this.form['allergens'][0] == null || _this.form['allergens'][0] == undefined) {
                    _this.Allergen = false;
                }
                else {
                    _this.Allergen = true;
                }
                if (_this.form['nutrients'] == null || _this.form['nutrients'] == undefined) {
                    _this.Nutrients = false;
                }
                else {
                    for (var i = 0; i < _this.form['nutrients'].length; i++) {
                        if (_this.form['nutrients'][i].id == null) {
                            _this.form['nutrients'][i]['color'] = false;
                            _this.form['nutrients'][i]['white'] = false;
                            _this.Nutrients = false;
                        }
                        else {
                            if (i == 0 || i == 2 || i == 4 || i == 6 || i == 8 || i == 10 || i == 12) {
                                _this.form['nutrients'][i]['color'] = true;
                                _this.form['nutrients'][i]['white'] = false;
                            }
                            else {
                                _this.form['nutrients'][i]['color'] = false;
                                _this.form['nutrients'][i]['white'] = true;
                            }
                            _this.Nutrients = true;
                        }
                    }
                }
                _this.boolError = false;
                _this.boolMessage = false;
                loading.dismiss();
            }
            else if (!(form2['message'] === undefined || form2['message'] === null || form2['message'] === [] || form2['message'] === '')) {
                _this.boolMessage = true;
                _this.boolError = false;
                _this.Message = form2['message'];
                loading.dismiss();
            }
            else {
                _this.boolError = true;
                _this.boolMessage = true;
                _this.Message = form2['CustomError'];
                loading.dismiss();
            }
        });
    };
    ItemDetails.prototype.loadItem = function (Item) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: ' Loading...',
        });
        loading.present()
            .then(function () {
            _this.form = _this.Item;
            _this.form['image'] = "assets/image-placeholder.jpg";
            _this.Total = _this.form['price'];
            _this.SubItems = true;
            _this.Description = false;
            if (_this.form['allergens'] == null || _this.form['allergens'] == undefined || _this.form['allergens'][0] == null || _this.form['allergens'][0] == undefined) {
                _this.Allergen = false;
            }
            else {
                _this.Allergen = true;
            }
            if (_this.form['nutrients'] == null || _this.form['nutrients'] == undefined) {
                _this.Nutrients = false;
            }
            else {
                _this.Nutrients = true;
            }
            _this.boolError = false;
            _this.boolMessage = false;
            loading.dismiss();
        });
    };
    ItemDetails.prototype.OrderPage = function () {
        this.shoppingcart.addtoCart(this.Dish_ID, this.form['title'], this.quantity, this.form['price'], this.type, this.SpecialRequest);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__order_order__["a" /* Order */], {}, { animate: false });
    };
    ItemDetails.prototype.BackPage = function () {
        this.navCtrl.pop({ animate: false });
    };
    ItemDetails.prototype.Plus = function () {
        this.quantity = this.quantity + 1;
        this.Total = Number(this.Total) + Number(this.form['price']);
        this.Total = Math.round(this.Total * 100) / 100;
    };
    ItemDetails.prototype.Minus = function () {
        if (this.quantity == 1 || this.quantity == 2) {
            this.quantity = 1;
            this.Total = this.form['price'];
        }
        else {
            this.quantity = this.quantity - 1;
            this.Total = Number(this.Total) - Number(this.form['price']);
            this.Total = Math.round(this.Total * 100) / 100;
        }
    };
    return ItemDetails;
}());
ItemDetails = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-item-details',template:/*ion-inline-start:"F:\SubWay\SubWay\src\pages\item-details\item-details.html"*/'<ion-header *ngIf="!ios_css">\n  <ion-toolbar color="title" no-padding>\n    <ion-grid no-padding>\n      <ion-row align-items-center>\n        <ion-col col-1>\n            <button ion-button clear class="BackPageButton" Style="color:white;" left (click)="BackPage()">\n              <ion-icon style="zoom:1.7;" name="ios-arrow-back"></ion-icon>\n            </button>\n        </ion-col>\n        <ion-col col-9>\n            <ion-title style="text-align:center;" no-padding>\n                 <img class="logotitle" src="assets/App-Logo.png"/>\n            </ion-title>\n        </ion-col>\n        <ion-col col-1>\n            <ion-title class="titlecart" no-padding *ngIf="boolQty">\n            		 <img (click)="CartIcon()" class="carticon" src="assets/cart1.png"/>\n                 <p (click)="CartIcon()" class="imgcart"> {{Qty}} </p>\n        	  </ion-title>\n            <ion-title class="titlecart" no-padding *ngIf="!boolQty">\n            		 <img (click)="CartIcon()" class="carticon" src="assets/cart1.png"/>\n        	  </ion-title>\n        </ion-col>\n        <ion-col col-1>\n            <button ion-button clear color="white" right class="popoverbutton" (click)="presentPopover($event)">\n              <ion-icon style="zoom:1.7;" name="md-more"></ion-icon>\n            </button>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-toolbar>\n</ion-header>\n\n<ion-header *ngIf="ios_css">\n  <ion-toolbar color="title" no-padding>\n    <ion-grid no-padding>\n      <ion-row align-items-center>\n        <ion-col col-1>\n            <button ion-button clear class="BackButton" left (click)="BackPage()">\n              <ion-icon style="zoom:1.7;" name="ios-arrow-back"></ion-icon>\n            </button>\n        </ion-col>\n        <ion-col col-9>\n               <img class="logotitle_ios" src="assets/App-Logo.png"/>\n        </ion-col>\n        <ion-col col-1 *ngIf="boolQty">\n            		 <img (click)="CartIcon()" class="carticon" src="assets/cart1.png"/>\n                 <p (click)="CartIcon()" class="imgcart"> {{Qty}} </p>\n       </ion-col>\n        <ion-col col-1 *ngIf="!boolQty">\n            		 <img (click)="CartIcon()" class="carticon" src="assets/cart1.png"/>\n        </ion-col>\n        <ion-col col-1>\n            <button ion-button clear color="white" right class="popoverbutton" (click)="presentPopover($event)">\n              <ion-icon style="zoom:1.7;" name="md-more"></ion-icon>\n            </button>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-toolbar>\n</ion-header>\n\n\n<ion-content padding>\n  <div class="hr-solid-line" style="display:block; width:100%; text-align:center;">\n    		<img Style="height:240px; width:auto;" [src]="form.image"  onError="this.src=\'assets/image-placeholder.jpg\';" alt="" />\n  </div>\n\n	<span Style="display:block;padding:0px;">\n          <p class="hr-list2 Heading">  {{form.title}} </p>\n    </span>\n\n	<span class="MarginPadding">\n			<span *ngIf="SubItems" style="display:block;padding-left:20px;">\n					<p class="Details_Description" *ngFor="let item of form.sub_items">\n						{{item.qty}} x {{item.title}}\n					</p>\n			</span>\n\n        <div class="Details_Description" *ngIf="Description" [innerHTML]="form.description"></div>\n\n			<span class="Span_Table" *ngIf="Allergen">\n		        <p class="DetailsPage_TextHeader" > Allergens </p>\n		        <span class="inlineblock-padding" *ngFor="let allergens of form.allergens">\n		                <div class="innerAllergen">\n		                      <img class="imgAllergen" [src]="allergens.small_image_uri"  onError="this.src=\'assets/image-placeholder.jpg\';" alt="" />\n		                </div>\n		                <p class="TitleAllergen"> {{allergens.title}} </p>\n		        </span>\n		    </span>\n    </span>\n\n    <span Style="display:block;padding:0px;" *ngIf="Nutrients">\n          <p class="hr-list2 Heading">  Dish Nutrients </p>\n    </span>\n    <span class= "MarginPadding" *ngFor="let nutrients of form.nutrients">\n            <span class="Nutrients-colored-span" *ngIf="nutrients.color && Nutrients">\n                          <ion-row class="zero-padding">\n                              <ion-col col-8>\n                                  <p class="Detail_Text zero-padding"> {{nutrients.title}}  </p>\n                              </ion-col>\n                              <ion-col col-4>\n                                  <p class="Detail_Text zero-padding" Style="text-align:right;"> {{nutrients.qty}} </p>\n                              </ion-col>\n                          </ion-row>\n            </span>\n            <span class="Nutrients-white-span" *ngIf="nutrients.white && Nutrients">\n                        <ion-row no-padding>\n                            <ion-col col-8>\n                                <p class="Detail_Text zero-padding">  {{nutrients.title}}  </p>\n                            </ion-col>\n                            <ion-col col-4>\n                                <p class="Detail_Text zero-padding" Style="text-align:right;"> {{nutrients.qty}} </p>\n                            </ion-col>\n                        </ion-row>\n            </span>\n    </span>\n\n    <span Style="display:block;padding:0px;">\n          <p class="hr-list2 Heading">  Order Now </p>\n    </span>\n    <span class="Nutrients-colored-span" style="margin-top:4px; margin-bottom:4px;">\n            <ion-row class="zero-padding">\n                    <ion-col col-8>\n                            <p class="Detail_Text zero-padding" Style="text-align:left;"> Quantity </p>\n                    </ion-col>\n            		<ion-col col-4>\n                    		<p class="Detail_Text zero-padding" Style="text-align:right;">\n                          <ion-grid no-padding class="QuantityGrid">\n                                  <ion-row no-padding>\n                                        <ion-col col-4>\n                                              <button ion-button class="QuantityButton" small color="title" (click)="Minus()">\n                                                  <ion-icon name="remove"></ion-icon>\n                                              </button>\n                                        </ion-col>\n                                        <ion-col col-4>\n                                          <p class="Qty_Label"> {{quantity}} </p>\n                                        </ion-col>\n                                        <ion-col col-4>\n                                              <button ion-button class="QuantityButton" small color="title" (click)="Plus()">\n                                                  <ion-icon name="add"></ion-icon>\n                                              </button>\n                                        </ion-col>\n                                  </ion-row>\n                          </ion-grid>\n                    		</p>\n            		 </ion-col>\n            </ion-row>\n    </span>\n    <span class="Nutrients-colored-span" style="margin-top:4px; margin-bottom:4px;">\n            <ion-row class="zero-padding">\n                    <ion-col col-8>\n                            <p class="Detail_Text zero-padding" Style="text-align:left;"> Total Price </p>\n                    </ion-col>\n            		<ion-col col-4>\n                    		<p class="Detail_Text zero-padding Total">\n                    		$ {{Total}} </p>\n            		 </ion-col>\n            </ion-row>\n    </span>\n\n    <span Style="display:block;padding:0px;">\n          <p class="hr-list2 Heading">  Special Request (Optional) </p>\n    </span>\n    <ion-item no-padding class="Heading">\n           <ion-textarea type="text" [(ngModel)]="SpecialRequest" placeholder="Type Here" rows="1" cols="50"  [ngModelOptions]="{standalone: true}" ></ion-textarea>\n    </ion-item>\n\n    <span *ngIf="boolMessage" class="MessageContainer">\n        <p class="Message">{{Message}}</p>\n        <p Style="text-align:center; margin=0px; padding: 7px 25px 7px 25px; display:block;" *ngIf="boolError">\n          <button ion-button class="button_text" (click)="Reload()"> RETRY </button>\n        </p>\n    </span>\n\n</ion-content>\n\n<ion-footer no-lines no-border class="zero-padding" color="white" *ngIf="!boolMessage">\n    <span Style="margin=0px; padding: 7px 25px 7px 25px; display:block; background:white;">\n      <button ion-button class="button_text" block (click)="OrderPage()"> Add to Order </button>\n    </span>\n</ion-footer>\n'/*ion-inline-end:"F:\SubWay\SubWay\src\pages\item-details\item-details.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7__providers_service__["a" /* ServiceProvider */], __WEBPACK_IMPORTED_MODULE_6__providers_MyErrorHandler__["a" /* MyErrorHandler */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_google_analytics__["a" /* GoogleAnalytics */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* PopoverController */], __WEBPACK_IMPORTED_MODULE_2__providers_shopping_service__["a" /* ShoppingServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
], ItemDetails);

//# sourceMappingURL=item-details.js.map

/***/ }),

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddAddress; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_shopping_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_device__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Promotions_Promotions__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__payment_payment__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_google_analytics__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_MyErrorHandler__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_service__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_GlobalConstants__ = __webpack_require__(205);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var AddAddress = (function () {
    function AddAddress(service, handler, platform, ga, popoverCtrl, alertCtrl, device, loadingCtrl, shoppingcart, navCtrl, navParams) {
        this.service = service;
        this.handler = handler;
        this.platform = platform;
        this.ga = ga;
        this.popoverCtrl = popoverCtrl;
        this.alertCtrl = alertCtrl;
        this.device = device;
        this.loadingCtrl = loadingCtrl;
        this.shoppingcart = shoppingcart;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.bool_CashonDelivery = false;
        this.bool_PickFromRestaurant = false;
        this.bool_CreditCardPayment = false;
        this.newOrder = [];
        this.form = {};
        this.boolMessage = false;
        this.boolError = false;
        this.ios_css = false;
        if (this.platform.is('ios')) {
            this.ios_css = true;
        }
        else {
            this.ios_css = false;
        }
        this.HardwareID = this.device.uuid;
        this.CashonDelivery();
    }
    AddAddress.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.ga.trackView('Checkout Page');
        })
            .catch(function (e) {
            _this.handler.handleError('Error starting GoogleAnalytics : ' + e);
        });
    };
    AddAddress.prototype.Failed = function (message) {
        var alert = this.alertCtrl.create({
            title: 'Failed',
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    };
    AddAddress.prototype.Success = function (message) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Success',
            subTitle: message,
            buttons: [{
                    text: 'OK',
                    handler: function () {
                        if (_this.bool_CreditCardPayment == true) {
                            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__payment_payment__["a" /* Payment */], { data: _this.data }, { animate: false });
                        }
                        else {
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__Promotions_Promotions__["a" /* Promotions */], {}, { animate: false });
                        }
                    }
                }]
        });
        alert.present();
    };
    AddAddress.prototype.Submit = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: ' Loading...',
            showBackdrop: false,
        });
        loading.present()
            .then(function () {
            if (_this.Email == null || _this.MobileNumber == null || _this.Address == null) {
                loading.dismiss();
                _this.Failed('Fields Are Empty');
            }
            else {
                if (_this.validateEmail(_this.Email) == true) {
                    _this.newOrder = [];
                    var cart = _this.shoppingcart.getShoppingCart();
                    for (var i = 0; i < cart.length; i++) {
                        _this.newOrder.push({ "quantity": cart[i]['dish_qty'], "id": cart[i]['dish_id'], "type": cart[i]['type'], "request": cart[i]['request'] });
                    }
                    _this.form = { "hardware_id": _this.HardwareID,
                        "address": _this.Address,
                        "phone": _this.MobileNumber,
                        "restaurant_id": __WEBPACK_IMPORTED_MODULE_9__providers_GlobalConstants__["c" /* RestaurantID */],
                        "email": _this.Email,
                        "comments": _this.Comments,
                        "items": _this.newOrder
                    };
                    if (_this.bool_CashonDelivery == true) {
                        _this.form['paymentMethod'] = "1";
                    }
                    if (_this.bool_PickFromRestaurant == true) {
                        _this.form['paymentMethod'] = "2";
                    }
                    if (_this.bool_CreditCardPayment == true) {
                        _this.form['paymentMethod'] = "3";
                    }
                    var form2 = _this.service.PlaceOrder(_this.form);
                    console.log(form2);
                    console.log(form2['data']);
                    console.log(form2['message']);
                    if (!(form2['data'] === undefined || form2['data'] === null || form2['data'] === [] || form2['data'] === '')) {
                        _this.boolError = false;
                        _this.boolMessage = false;
                        loading.dismiss();
                        if (form2['message'] == 'Order register successfully.') {
                            _this.data = form2['data'];
                            _this.Email = '';
                            _this.MobileNumber = '';
                            _this.Address = '';
                            _this.Comments = '';
                            _this.shoppingcart.clearCart();
                            _this.Success(form2['message']);
                        }
                    }
                    else if (!(form2['message'] === undefined || form2['message'] === null || form2['message'] === [] || form2['message'] === '')) {
                        _this.boolError = false;
                        _this.boolMessage = false;
                        loading.dismiss();
                        _this.Failed(form2['message']);
                    }
                    else {
                        _this.boolError = true;
                        _this.boolMessage = true;
                        _this.Message = form2['CustomError'];
                        loading.dismiss();
                    }
                }
                else {
                    loading.dismiss();
                    _this.Failed('Email Address is not Valid');
                }
            }
        });
    };
    AddAddress.prototype.validateEmail = function (email) {
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (reg.test(email) == false) {
            return false;
        }
        else {
            return true;
        }
    };
    AddAddress.prototype.BackPage = function () {
        this.navCtrl.pop({ animate: false });
    };
    AddAddress.prototype.CashonDelivery = function () {
        this.bool_CashonDelivery = true;
        this.bool_PickFromRestaurant = false;
        this.bool_CreditCardPayment = false;
    };
    AddAddress.prototype.PickFromRestaurant = function () {
        this.bool_CashonDelivery = false;
        this.bool_PickFromRestaurant = true;
        this.bool_CreditCardPayment = false;
    };
    AddAddress.prototype.CreditCardPayment = function (myEvent) {
        this.bool_CashonDelivery = false;
        this.bool_PickFromRestaurant = false;
        this.bool_CreditCardPayment = true;
    };
    return AddAddress;
}());
AddAddress = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-AddAddress',template:/*ion-inline-start:"F:\SubWay\SubWay\src\pages\AddAddress\AddAddress.html"*/'<ion-header *ngIf="!ios_css">\n  <ion-toolbar color="title" no-padding>\n    <ion-grid no-padding>\n      <ion-row align-items-center>\n        <ion-col col-1>\n            <button ion-button clear class="BackPageButton" Style="color:white;" left (click)="BackPage()">\n              <ion-icon style="zoom:1.7;" name="ios-arrow-back"></ion-icon>\n            </button>\n        </ion-col>\n        <ion-col col-9>\n            <ion-title style="text-align:center;" no-padding>\n                 <img class="logotitle" src="assets/App-Logo.png"/>\n            </ion-title>\n        </ion-col>\n        <ion-col col-1>\n        </ion-col>\n        <ion-col col-1>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-toolbar>\n</ion-header>\n\n<ion-header *ngIf="ios_css">\n  <ion-toolbar color="title" no-padding>\n    <ion-grid no-padding>\n      <ion-row align-items-center>\n        <ion-col col-1>\n            <button ion-button clear class="BackButton" left (click)="BackPage()">\n              <ion-icon style="zoom:1.7;" name="ios-arrow-back"></ion-icon>\n            </button>\n        </ion-col>\n        <ion-col col-9>\n               <img class="logotitle_ios" src="assets/App-Logo.png"/>\n        </ion-col>\n        <ion-col col-1>\n        </ion-col>\n        <ion-col col-1>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content padding>\n  <span class="Span_padding_OrderPage" style="margin-top:30px;">\n        <p class="hr-list2 Heading" style="font-size:18px;">  Your Information </p>\n\n        <ion-item no-padding class="Heading">\n               <ion-input type="Email" [(ngModel)]="Email" placeholder="Enter Your Email Address" rows="1" cols="50"  [ngModelOptions]="{standalone: true}"> </ion-input>\n        </ion-item>\n\n        <ion-item no-padding class="Heading">\n               <ion-input type="tel" [(ngModel)]="MobileNumber" placeholder="Enter Your Mobile Number" rows="1" cols="50"  [ngModelOptions]="{standalone: true}" ></ion-input>\n        </ion-item>\n\n        <ion-item no-padding class="Heading">\n               <ion-textarea type="text" [(ngModel)]="Address" placeholder="Enter Delivery Address" rows="4" cols="50"  [ngModelOptions]="{standalone: true}" ></ion-textarea>\n        </ion-item>\n\n        <ion-item no-padding class="Heading">\n               <ion-textarea type="text" [(ngModel)]="Comments" placeholder="Add Your Comments" rows="1" cols="50"  [ngModelOptions]="{standalone: true}" ></ion-textarea>\n        </ion-item>\n  </span>\n\n  <span class="Span_padding_OrderPage" style="margin-top:30px;">\n        <p class="hr-list2 Heading" style="font-size:18px;">  Your Payment Method </p>\n\n        <ion-grid>\n                <ion-row>\n                        <ion-col col-4>\n                            <span class="grid_image" (click)="CashonDelivery()" *ngIf="!bool_CashonDelivery">\n                                  <div class="img_grid">\n                      		          		<img style="height:auto;width:65px; margin-top:-2px;" src="assets/cos-96.png">\n                      		         </div>\n                      		         <p class="p_grid">Cash on Delivery</p>\n                            </span>\n                            <span class="grid_image_color" (click)="CashonDelivery()" *ngIf="bool_CashonDelivery">\n                                  <div class="img_grid">\n                                        <img style="height:auto;width:65px; margin-top:-2px;" src="assets/cos-96.png">\n                                   </div>\n                                   <p class="p_grid">Cash on Delivery</p>\n                            </span>\n                        </ion-col>\n\n                        <ion-col col-4 >\n                            <span class="grid_image" (click)="PickFromRestaurant()" *ngIf="!bool_PickFromRestaurant">\n                                  <div class="img_grid">\n                                        <img style="height:auto;width:50px;margin-top:2px;" src="assets/pickup-96.png">\n                                   </div>\n                                   <p class="p_grid">Pick from Restaurant</p>\n                            </span>\n                            <span class="grid_image_color" (click)="PickFromRestaurant()" *ngIf="bool_PickFromRestaurant">\n                                  <div class="img_grid">\n                                        <img style="height:auto;width:50px;margin-top:2px;" src="assets/pickup-96.png">\n                                   </div>\n                                   <p class="p_grid">Pick from Restaurant</p>\n                            </span>\n                        </ion-col>\n\n                        <ion-col col-4>\n                            <span class="grid_image poper" (click)="CreditCardPayment($event)" *ngIf="!bool_CreditCardPayment">\n                                    <div class="img_grid">\n                                          <img style="height:auto;width:50px;margin-top:2px;" src="assets/card-96.png">\n                                     </div>\n                                     <p class="p_grid">Credit Card Payment</p>\n                            </span>\n                            <span class="grid_image_color poper" (click)="CreditCardPayment($event)" *ngIf="bool_CreditCardPayment">\n                                     <div class="img_grid">\n                                          <img style="height:auto;width:50px;margin-top:2px;" src="assets/card-96.png">\n                                     </div>\n                                     <p class="p_grid">Credit Card Payment</p>\n                            </span>\n                        </ion-col>\n                </ion-row>\n        </ion-grid>\n  </span>\n\n  <span *ngIf="boolMessage" class="MessageContainer">\n      <p class="Message">{{Message}}</p>\n      <p Style="text-align:center; margin=0px; padding: 7px 25px 7px 25px; display:block;" *ngIf="boolError">\n        <button ion-button class="button_text" (click)="Submit()"> RETRY </button>\n      </p>\n  </span>\n</ion-content>\n\n<ion-footer no-lines no-border class="zero-padding" color="white" *ngIf="!boolMessage">\n    <span Style="margin=0px; padding: 7px 25px 10px 25px;; display:block; background:white;">\n      <button ion-button class="button_text" block (click)="Submit()"> Submit </button>\n    </span>\n</ion-footer>\n'/*ion-inline-end:"F:\SubWay\SubWay\src\pages\AddAddress\AddAddress.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_8__providers_service__["a" /* ServiceProvider */], __WEBPACK_IMPORTED_MODULE_7__providers_MyErrorHandler__["a" /* MyErrorHandler */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_google_analytics__["a" /* GoogleAnalytics */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* PopoverController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_device__["a" /* Device */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2__providers_shopping_service__["a" /* ShoppingServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
], AddAddress);

//# sourceMappingURL=AddAddress.js.map

/***/ }),

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Payment; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Promotions_Promotions__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_analytics__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_MyErrorHandler__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_service__ = __webpack_require__(27);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var Payment = (function () {
    function Payment(service, handler, platform, ga, statusBar, loadingCtrl, alertCtrl, navCtrl, navParams) {
        this.service = service;
        this.handler = handler;
        this.platform = platform;
        this.ga = ga;
        this.statusBar = statusBar;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.ios_css = false;
        this.boolMessage = false;
        this.boolError = false;
        this.ArrayYear = [];
        this.SaveDetails = true;
        if (this.platform.is('ios')) {
            this.ios_css = true;
        }
        else {
            this.ios_css = false;
        }
        this.data = navParams.get('data');
        this.date = new Date(Date.now());
        this.MinYear = this.date.getFullYear();
        for (var i = 0; i < 31; i++) {
            this.ArrayYear.push({ 'id': this.MinYear + i, 'Year': this.MinYear + i });
        }
    }
    Payment.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.ga.trackView('Payment Page');
        })
            .catch(function (e) {
            console.log('Error starting GoogleAnalytics', e);
        });
    };
    Payment.prototype.Failed = function (message) {
        var alert = this.alertCtrl.create({
            title: 'Failed',
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    };
    Payment.prototype.Success = function (message) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Success',
            subTitle: message,
            buttons: [{
                    text: 'OK',
                    handler: function () {
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__Promotions_Promotions__["a" /* Promotions */], {}, { animate: false });
                    }
                }]
        });
        alert.present();
    };
    Payment.prototype.Submit = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: ' Loading...',
            showBackdrop: false,
        });
        loading.present()
            .then(function () {
            if (_this.name == null || _this.number == null || _this.code == null || _this.Month == null || _this.Year == null) {
                loading.dismiss();
                _this.Failed('Required Fields Are Empty');
            }
            else {
                if (_this.number.length == 16) {
                    var data = new FormData();
                    data.append('cc_no', _this.number);
                    data.append('cc_cvv', _this.code);
                    data.append('cc_exp_month', _this.Month);
                    data.append('cc_exp_year', _this.Year);
                    data.append('order_id', _this.data['order_id']);
                    data.append('device_id', _this.data['device_id']);
                    var form2 = _this.service.PaymentDetails(data);
                    console.log(form2);
                    if (!(form2['data'] === undefined || form2['data'] === null || form2['data'] === [] || form2['data'] === '')) {
                        _this.boolError = false;
                        _this.boolMessage = false;
                        loading.dismiss();
                        _this.number = '';
                        _this.name = '';
                        _this.code = '';
                        _this.date = '';
                        _this.Year = '';
                        _this.Month = '';
                        _this.SaveDetails = true;
                        _this.Success(form2['message']);
                    }
                    else if (!(form2['message'] === undefined || form2['message'] === null || form2['message'] === [] || form2['message'] === '')) {
                        _this.boolError = false;
                        _this.boolMessage = false;
                        loading.dismiss();
                        _this.Failed(form2['message']);
                    }
                    else {
                        _this.boolError = true;
                        _this.boolMessage = true;
                        _this.Message = form2['CustomError'];
                        loading.dismiss();
                    }
                }
                else {
                    loading.dismiss();
                    _this.Failed("CreditCard Number is not Valid");
                }
            }
        });
    };
    Payment.prototype.BackPage = function () {
        this.navCtrl.pop({ animate: false });
    };
    Payment.prototype.SelectedCheckbox_update = function () {
    };
    return Payment;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('DateTime'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* DateTime */])
], Payment.prototype, "dateTime", void 0);
Payment = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-payment',template:/*ion-inline-start:"F:\SubWay\SubWay\src\pages\payment\payment.html"*/'<ion-header *ngIf="!ios_css">\n  <ion-toolbar color="title" no-padding>\n    <ion-grid no-padding>\n      <ion-row align-items-center>\n        <ion-col col-1>\n            <button ion-button clear class="BackPageButton" Style="color:white;" left (click)="BackPage()">\n              <ion-icon style="zoom:1.7;" name="ios-arrow-back"></ion-icon>\n            </button>\n        </ion-col>\n        <ion-col col-10>\n            <ion-title class="titleheading_text" no-padding>\n                <p class="titleheading_text">Credit Card Payment Options</p>\n            </ion-title>\n        </ion-col>\n        <ion-col col-1>\n            <button ion-button clear color="white" right class="popoverbutton">\n              <ion-icon style="zoom:1.7;" name="md-more"></ion-icon>\n            </button>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-toolbar>\n</ion-header>\n\n<ion-header *ngIf="ios_css">\n  <ion-toolbar color="title" no-padding>\n    <ion-grid no-padding>\n      <ion-row align-items-center>\n        <ion-col col-1>\n            <button ion-button clear class="BackPageButton" Style="color:white;" left (click)="BackPage()">\n              <ion-icon style="zoom:1.7;" name="ios-arrow-back"></ion-icon>\n            </button>\n        </ion-col>\n        <ion-col col-10>\n                 <p class="titleheading">Credit Card Payment Options</p>\n        </ion-col>\n        <ion-col col-1>\n            <button ion-button clear color="white" right class="popoverbutton">\n              <ion-icon style="zoom:1.7;" name="md-more"></ion-icon>\n            </button>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-toolbar>\n</ion-header>\n\n\n<ion-content padding>\n  <p class="hr-list2 Heading" style="font-size:18px;padding-top: 10px;">  Your Information </p>\n  <span class="abc">\n\n\n        <ion-item no-padding class="Heading" stacked no-lines>\n               <ion-label class="LabelCardDetails" stacked><div class="requiredfields">*</div><div class="TextCenter">Name on card</div><div class="reqiredinfo">(As it appears on your credit card)</div></ion-label>\n               <ion-input class="LabelCardDetails" [(ngModel)]="name" rows="1" cols="50" [ngModelOptions]="{standalone: true}"> </ion-input>\n        </ion-item>\n\n        <ion-item no-padding class="Heading" stacked>\n               <ion-label class="LabelCardDetails" stacked><div class="requiredfields">*</div><div class="TextCenter">Credit Card Number</div><div class="reqiredinfo">16 digits on the front of your card. No spaces</div></ion-label>\n               <ion-input type="tel" class="LabelCardDetails" maxlength="16"[(ngModel)]="number" rows="1" cols="50" [ngModelOptions]="{standalone: true}"> </ion-input>\n        </ion-item>\n\n          <ion-item no-padding class="Heading" stacked no-lines>\n               <ion-label class="LabelCardDetails" stacked><div class="requiredfields2">*</div><div class="TextCenter2">Expiration Date</div><div class="reqiredinfo2">Find Expiration date on the front of your card</div></ion-label>\n          </ion-item>\n          <ion-row no-padding>\n              <ion-col col-6 no-padding>\n                <ion-item no-padding>\n                  <ion-select no-padding placeholder="Month" [(ngModel)]="Month" [ngModelOptions]="{standalone: true}">\n                    <ion-option value="1">1</ion-option>\n                    <ion-option value="2">2</ion-option>\n                    <ion-option value="3">3</ion-option>\n                    <ion-option value="4">4</ion-option>\n                    <ion-option value="5">5</ion-option>\n                    <ion-option value="6">6</ion-option>\n                    <ion-option value="7">7</ion-option>\n                    <ion-option value="8">8</ion-option>\n                    <ion-option value="9">9</ion-option>\n                    <ion-option value="10">10</ion-option>\n                    <ion-option value="11">11</ion-option>\n                    <ion-option value="12">12</ion-option>\n                  </ion-select>\n               </ion-item>\n              </ion-col>\n              <ion-col col-6 no-padding>\n                <ion-item no-padding>\n                    <ion-select no-padding placeholder="Year" [(ngModel)]="Year" [ngModelOptions]="{standalone: true}">\n                      <ion-option *ngFor="let Year of ArrayYear" value={{Year.id}}>{{Year.Year}}</ion-option>\n                    </ion-select>\n               </ion-item>\n            </ion-col>\n      </ion-row>\n\n        <ion-item no-padding class="Heading" stacked no-lines>\n               <ion-label class="LabelCardDetails" stacked><div class="requiredfields">*</div><div class="TextCenter">Security Code</div><div class="reqiredinfo">(CVV or CVV2. 3 Digits on the back. AMex: 4 on the front.</div></ion-label>\n               <ion-input type="tel" maxlength="4" class="LabelCardDetails" [(ngModel)]="code" rows="1" cols="50" [ngModelOptions]="{standalone: true}"> </ion-input>\n        </ion-item>\n  </span>\n      <ion-item no-lines>\n          <ion-label class="LabelCardDetails">Save my credit details for futur orders on the secure indolj payment system.</ion-label>\n          <ion-checkbox [(ngModel)]="SaveDetails" (ionChange)="SelectedCheckbox_update()" [ngModelOptions]="{standalone: true}"></ion-checkbox>\n      </ion-item>\n\n      <span *ngIf="boolMessage" class="MessageContainer">\n          <p class="Message">{{Message}}</p>\n          <p Style="text-align:center; margin=0px; padding: 7px 25px 7px 25px; display:block;" *ngIf="boolError">\n            <button ion-button class="button_text" (click)="Submit()"> RETRY </button>\n          </p>\n      </span>\n</ion-content>\n\n<ion-footer no-lines no-border class="zero-padding" color="white" *ngIf="!boolMessage">\n    <span Style="margin=0px; padding: 7px 25px 10px 25px;; display:block; background:white;">\n      <button ion-button class="button_text" block (click)="Submit()"> Place Your Order </button>\n    </span>\n</ion-footer>\n'/*ion-inline-end:"F:\SubWay\SubWay\src\pages\payment\payment.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6__providers_service__["a" /* ServiceProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_MyErrorHandler__["a" /* MyErrorHandler */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_analytics__["a" /* GoogleAnalytics */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
], Payment);

//# sourceMappingURL=payment.js.map

/***/ }),

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return apiUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ChainID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return RestaurantID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthHeader; });
/* unused harmony export GlobalConstants */
//BaseConstants
//BaseConstants
var apiUrl = 'http://dev.indolj.com/api/v2.1/';
var ChainID = '1';
var RestaurantID = '16201';
var AuthHeader = 'eXVteXVtbWk6bW9iaWxl';
var GlobalConstants = (function () {
    function GlobalConstants() {
    }
    return GlobalConstants;
}());

//# sourceMappingURL=GlobalConstants.js.map

/***/ }),

/***/ 206:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyOrders; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_device__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_google_analytics__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_MyErrorHandler__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_service__ = __webpack_require__(27);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MyOrders = (function () {
    function MyOrders(service, handler, platform, ga, alertCtrl, device, loadingCtrl, navCtrl, navParams) {
        this.service = service;
        this.handler = handler;
        this.platform = platform;
        this.ga = ga;
        this.alertCtrl = alertCtrl;
        this.device = device;
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.Title = [];
        this.boolMessage = false;
        this.boolError = false;
        this.ios_css = false;
        if (this.platform.is('ios')) {
            this.ios_css = true;
        }
        else {
            this.ios_css = false;
        }
        this.Load(this.device.uuid);
    }
    MyOrders.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.ga.trackView('Order History Page');
        })
            .catch(function (e) {
            _this.handler.handleError('Error starting GoogleAnalytics : ' + e);
        });
    };
    MyOrders.prototype.Reload = function () {
        this.Load(this.device.uuid);
    };
    MyOrders.prototype.AlertMessage = function (message) {
        var alert = this.alertCtrl.create({
            subTitle: message,
            buttons: [{
                    text: 'OK',
                }]
        });
        alert.present();
    };
    MyOrders.prototype.Load = function (Device_ID) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: ' Loading...',
        });
        loading.present()
            .then(function () {
            var form2 = _this.service.OrderHistory(Device_ID);
            //let form2 = this.service.OrderHistory('75737a48682c7430');
            console.log(form2);
            var a = 0;
            console.log(form2['data']);
            console.log(form2['message']);
            if (!(form2['message'] === undefined || form2['message'] === null || form2['message'] === [] || form2['message'] === '')) {
                var msg = form2['message'];
                _this.AlertMessage(msg['0']);
                _this.boolError = false;
                _this.boolMessage = false;
                loading.dismiss();
            }
            else if (!(form2['data'] === undefined || form2['data'] === null || form2['data'] === [] || form2['data'] === '')) {
                loading.dismiss();
                _this.orders = form2['data']['orders'];
                for (var j = 0; j < _this.orders.length; j++) {
                    if (_this.orders[j].length == 0) {
                    }
                    else {
                        var data = _this.orders[j]['items'];
                        var text = '';
                        for (var i = 0; i < data.length; i++) {
                            if (i == 0) {
                                text = "<p class='number'>" + data[i]['item_qty'] + " X </p><p class='text'> " + data[i]['item_name'] + "</p>";
                            }
                            else {
                                text = text + "+ <p class='number'>" + data[i]['item_qty'] + " X </p><p class='text'> " + data[i]['item_name'] + "</p>";
                            }
                        }
                        _this.orders[j]['CustomTitle'] = text;
                    }
                }
                _this.boolError = false;
                _this.boolMessage = false;
            }
            else {
                _this.boolError = true;
                _this.boolMessage = true;
                _this.Message = form2['CustomError'];
                loading.dismiss();
            }
        });
    };
    MyOrders.prototype.BackPage = function () {
        this.navCtrl.pop({ animate: false });
    };
    return MyOrders;
}());
MyOrders = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-my-orders',template:/*ion-inline-start:"F:\SubWay\SubWay\src\pages\my-orders\my-orders.html"*/'<ion-header *ngIf="!ios_css">\n  <ion-toolbar color="title" no-padding>\n    <ion-grid no-padding>\n      <ion-row align-items-center>\n        <ion-col col-1>\n            <button ion-button clear class="BackPageButton" Style="color:white;" left (click)="BackPage()">\n              <ion-icon style="zoom:1.7;" name="ios-arrow-back"></ion-icon>\n            </button>\n        </ion-col>\n        <ion-col col-10>\n            <ion-title no-padding>\n                <p class="titleheading_text">My Orders</p>\n            </ion-title>\n        </ion-col>\n        <ion-col col-1>\n            <button ion-button clear color="white" right class="popoverbutton">\n              <ion-icon style="zoom:1.7;" name="md-more"></ion-icon>\n            </button>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-toolbar>\n</ion-header>\n\n<ion-header *ngIf="ios_css">\n  <ion-toolbar color="title" no-padding>\n    <ion-grid>\n      <ion-row align-items-center>\n        <ion-col col-1 class="colPadding1">\n            <button ion-button clear class="BackPageButton" Style="color:white;" left (click)="BackPage()">\n              <ion-icon style="zoom:1.7;" name="ios-arrow-back"></ion-icon>\n            </button>\n        </ion-col>\n        <ion-col col-10 class="colPadding2">\n                 <p class="titleheading">My Orders</p>\n        </ion-col>\n        <ion-col col-1 class="colPadding3">\n            <button ion-button clear color="white" right class="popoverbutton">\n              <ion-icon style="zoom:1.7;" name="md-more"></ion-icon>\n            </button>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <span class="MyOrders_ListSpan">\n      <span class="MyOrders_Heading">\n          <p class="LeftAlign LeftList"> Food Orders </p>\n          <p class="LeftAlign CenterList"> Status </p>\n          <p class="RightAlign RightList"> Total Price </p>\n      </span>\n\n      <span class="MyOrders_List" *ngFor="let i of orders">\n          <div class="LeftAlign LeftList" style="display:-webkit-box;" [innerHTML]="i.CustomTitle"></div>\n          <p class="LeftAlign CenterList">{{i.status}}</p>\n          <p class="RightAlign RightList"> ${{i.order_total}} </p>\n      </span>\n  </span>\n\n  <span *ngIf="boolMessage" class="MessageContainer">\n      <p class="Message">{{Message}}</p>\n      <p Style="text-align:center; margin=0px; padding: 7px 25px 7px 25px; display:block;" *ngIf="boolError">\n        <button ion-button class="button_text" (click)="Reload()"> RETRY </button>\n      </p>\n  </span>\n</ion-content>\n'/*ion-inline-end:"F:\SubWay\SubWay\src\pages\my-orders\my-orders.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__providers_service__["a" /* ServiceProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_MyErrorHandler__["a" /* MyErrorHandler */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_google_analytics__["a" /* GoogleAnalytics */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_device__["a" /* Device */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
], MyOrders);

//# sourceMappingURL=my-orders.js.map

/***/ }),

/***/ 208:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(227);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 227:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_Promotions_Promotions__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_menus_menus__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_item_details_item_details__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_order_order__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_AddAddress_AddAddress__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_popover_popover__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_my_orders_my_orders__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_payment_payment__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_MyErrorHandler__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_service__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__providers_shopping_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_status_bar__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_splash_screen__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_device__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_google_analytics__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//Other Imports





//Pages








//Services And Plugins







var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_5__pages_Promotions_Promotions__["a" /* Promotions */],
            __WEBPACK_IMPORTED_MODULE_6__pages_menus_menus__["a" /* MenusPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_item_details_item_details__["a" /* ItemDetails */],
            __WEBPACK_IMPORTED_MODULE_8__pages_order_order__["a" /* Order */],
            __WEBPACK_IMPORTED_MODULE_9__pages_AddAddress_AddAddress__["a" /* AddAddress */],
            __WEBPACK_IMPORTED_MODULE_10__pages_popover_popover__["a" /* PopoverPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_my_orders_my_orders__["a" /* MyOrders */],
            __WEBPACK_IMPORTED_MODULE_12__pages_payment_payment__["a" /* Payment */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {
                backButtonIcon: "ios-arrow-back",
                tabSubPages: false,
                scrollPadding: false,
                scrollAssist: true,
                autoFocusAssist: false,
                mode: 'md'
            }),
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_5__pages_Promotions_Promotions__["a" /* Promotions */],
            __WEBPACK_IMPORTED_MODULE_6__pages_menus_menus__["a" /* MenusPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_item_details_item_details__["a" /* ItemDetails */],
            __WEBPACK_IMPORTED_MODULE_8__pages_order_order__["a" /* Order */],
            __WEBPACK_IMPORTED_MODULE_9__pages_AddAddress_AddAddress__["a" /* AddAddress */],
            __WEBPACK_IMPORTED_MODULE_10__pages_popover_popover__["a" /* PopoverPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_my_orders_my_orders__["a" /* MyOrders */],
            __WEBPACK_IMPORTED_MODULE_12__pages_payment_payment__["a" /* Payment */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_14__providers_service__["a" /* ServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_13__providers_MyErrorHandler__["a" /* MyErrorHandler */],
            __WEBPACK_IMPORTED_MODULE_15__providers_shopping_service__["a" /* ShoppingServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_16__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_17__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_18__ionic_native_device__["a" /* Device */],
            __WEBPACK_IMPORTED_MODULE_19__ionic_native_google_analytics__["a" /* GoogleAnalytics */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_13__providers_MyErrorHandler__["a" /* MyErrorHandler */] },
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 267:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_Promotions_Promotions__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_service__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_google_analytics__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_MyErrorHandler__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var MyApp = (function () {
    function MyApp(handler, ga, platform, service, menu, statusBar, splashScreen) {
        this.handler = handler;
        this.ga = ga;
        this.platform = platform;
        this.service = service;
        this.menu = menu;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        // make HelloIonicPage the root (or first) page
        this.rootPage = __WEBPACK_IMPORTED_MODULE_2__pages_Promotions_Promotions__["a" /* Promotions */];
        this.initializeApp();
        // set our app's pages
        this.pages = [
            { title: 'My First List', component: __WEBPACK_IMPORTED_MODULE_2__pages_Promotions_Promotions__["a" /* Promotions */] }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.backgroundColorByHexString('#08400F');
            setTimeout(function () {
                _this.splashScreen.hide();
            }, 50);
            _this.ga.startTrackerWithId('UA-107775151-1')
                .then(function () {
            })
                .catch(function (e) { return _this.handler.handleError("ERROR: " + e); });
        })
            .catch(function (e) { return _this.handler.handleError("ERROR: " + e); });
    };
    MyApp.prototype.openPage = function (page) {
        // close the menu when clicking a link from the menu
        this.menu.close();
        // navigate to the new page if it is not the current page
        this.nav.setRoot(page.component);
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"F:\SubWay\SubWay\src\app\app.html"*/'\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n'/*ion-inline-end:"F:\SubWay\SubWay\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7__providers_MyErrorHandler__["a" /* MyErrorHandler */],
        __WEBPACK_IMPORTED_MODULE_6__ionic_native_google_analytics__["a" /* GoogleAnalytics */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_5__providers_service__["a" /* ServiceProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 27:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_MyErrorHandler__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_GlobalConstants__ = __webpack_require__(205);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ServiceProvider = (function () {
    function ServiceProvider(handler, http) {
        this.handler = handler;
        this.http = http;
        this.form = {};
        console.log(__WEBPACK_IMPORTED_MODULE_5__providers_GlobalConstants__["d" /* apiUrl */]);
        console.log(__WEBPACK_IMPORTED_MODULE_5__providers_GlobalConstants__["b" /* ChainID */]);
        console.log(__WEBPACK_IMPORTED_MODULE_5__providers_GlobalConstants__["c" /* RestaurantID */]);
        console.log(__WEBPACK_IMPORTED_MODULE_5__providers_GlobalConstants__["a" /* AuthHeader */]);
    }
    ServiceProvider.prototype.loadSetting = function () {
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", __WEBPACK_IMPORTED_MODULE_5__providers_GlobalConstants__["d" /* apiUrl */] + '/chains/' + __WEBPACK_IMPORTED_MODULE_5__providers_GlobalConstants__["b" /* ChainID */] + '/settings', false);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.setRequestHeader('Authorization', __WEBPACK_IMPORTED_MODULE_5__providers_GlobalConstants__["a" /* AuthHeader */]);
        try {
            xhttp.send();
            if (xhttp.readyState === 4 && xhttp.status === 200 && xhttp.responseText != "") {
                var res = JSON.parse(xhttp.response);
                this.form['data'] = res['data'];
                this.form['message'] = res['message'];
                this.form['CustomError'] = null;
            }
            else {
                this.handler.handleError("API: " + xhttp.responseURL + " , ResponseStatus: " + xhttp.status);
                this.form['CustomError'] = 'Sorry! Connection Failed.';
                this.form['message'] = {};
                this.form['data'] = {};
            }
        }
        catch (err) {
            this.handler.handleError(err);
            this.form['CustomError'] = 'Check Your Internet Connection And Try Again.';
            this.form['message'] = null;
            this.form['data'] = null;
        }
        return this.form;
    };
    ServiceProvider.prototype.loadMenu = function () {
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", __WEBPACK_IMPORTED_MODULE_5__providers_GlobalConstants__["d" /* apiUrl */] + 'chains/' + __WEBPACK_IMPORTED_MODULE_5__providers_GlobalConstants__["b" /* ChainID */] + '/restaurants/' + __WEBPACK_IMPORTED_MODULE_5__providers_GlobalConstants__["c" /* RestaurantID */] + '/menu', false);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.setRequestHeader('Authorization', __WEBPACK_IMPORTED_MODULE_5__providers_GlobalConstants__["a" /* AuthHeader */]);
        try {
            xhttp.send();
            if (xhttp.readyState === 4 && xhttp.status === 200 && xhttp.responseText != "") {
                var res = JSON.parse(xhttp.response);
                this.form['data'] = res['data'];
                this.form['message'] = res['message'];
                this.form['CustomError'] = null;
            }
            else {
                this.handler.handleError("API: " + xhttp.responseURL + " , ResponseStatus: " + xhttp.status);
                this.form['CustomError'] = 'Sorry! Connection Failed.';
                this.form['message'] = {};
                this.form['data'] = {};
            }
        }
        catch (err) {
            this.handler.handleError(err);
            this.form['CustomError'] = 'Check Your Internet Connection And Try Again.';
            this.form['message'] = null;
            this.form['data'] = null;
        }
        return this.form;
    };
    ServiceProvider.prototype.OrderHistory = function (ID) {
        var data = new FormData();
        data.append('hardware_id', ID);
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", __WEBPACK_IMPORTED_MODULE_5__providers_GlobalConstants__["d" /* apiUrl */] + 'order/user_orders', false);
        xhttp.setRequestHeader('Authorization', __WEBPACK_IMPORTED_MODULE_5__providers_GlobalConstants__["a" /* AuthHeader */]);
        try {
            xhttp.send(data);
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                var res = JSON.parse(xhttp.response);
                this.form['data'] = res['data'];
                this.form['message'] = res['message'];
                this.form['CustomError'] = null;
            }
            else {
                this.handler.handleError("API: " + xhttp.responseURL + " , ResponseStatus: " + xhttp.status);
                this.form['CustomError'] = 'Sorry! Connection Failed.';
                this.form['message'] = {};
                this.form['data'] = {};
            }
        }
        catch (err) {
            this.handler.handleError(err);
            this.form['CustomError'] = 'Check Your Internet Connection And Try Again.';
            this.form['message'] = null;
            this.form['data'] = null;
        }
        return this.form;
    };
    ServiceProvider.prototype.ItemDetails = function (Dish_ID) {
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", __WEBPACK_IMPORTED_MODULE_5__providers_GlobalConstants__["d" /* apiUrl */] + 'chains/' + __WEBPACK_IMPORTED_MODULE_5__providers_GlobalConstants__["b" /* ChainID */] + '/restaurants/' + __WEBPACK_IMPORTED_MODULE_5__providers_GlobalConstants__["c" /* RestaurantID */] + '/dish/' + Dish_ID, false);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.setRequestHeader('Authorization', __WEBPACK_IMPORTED_MODULE_5__providers_GlobalConstants__["a" /* AuthHeader */]);
        try {
            xhttp.send();
            if (xhttp.readyState === 4 && xhttp.status === 200 && xhttp.responseText != "") {
                var res = JSON.parse(xhttp.response);
                this.form['data'] = res['data'];
                this.form['message'] = res['message'][0];
                this.form['CustomError'] = null;
            }
            else {
                this.handler.handleError("API: " + xhttp.responseURL + " , ResponseStatus: " + xhttp.status);
                this.form['CustomError'] = 'Sorry! Connection Failed.';
                this.form['message'] = {};
                this.form['data'] = {};
            }
        }
        catch (err) {
            this.handler.handleError(err);
            this.form['CustomError'] = 'Check Your Internet Connection And Try Again.';
            this.form['message'] = null;
            this.form['data'] = null;
        }
        return this.form;
    };
    ServiceProvider.prototype.PlaceOrder = function (Order) {
        var data = new FormData();
        data.append('order', JSON.stringify(Order));
        console.log(data);
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", __WEBPACK_IMPORTED_MODULE_5__providers_GlobalConstants__["d" /* apiUrl */] + 'order/registration', false);
        xhttp.setRequestHeader('Authorization', __WEBPACK_IMPORTED_MODULE_5__providers_GlobalConstants__["a" /* AuthHeader */]);
        try {
            xhttp.send(data);
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                var res = JSON.parse(xhttp.response);
                this.form['data'] = res['data'];
                this.form['message'] = res['message'];
                this.form['CustomError'] = null;
                console.log(this.form);
            }
            else {
                this.handler.handleError("API: " + xhttp.responseURL + " , ResponseStatus: " + xhttp.status);
                this.form['CustomError'] = 'Sorry! Connection Failed.';
                this.form['message'] = {};
                this.form['data'] = {};
                console.log(this.form);
            }
        }
        catch (err) {
            this.handler.handleError(err);
            this.form['CustomError'] = 'Check Your Internet Connection And Try Again.';
            this.form['message'] = null;
            this.form['data'] = null;
            console.log(this.form);
        }
        return this.form;
    };
    ServiceProvider.prototype.PaymentDetails = function (data) {
        console.log(data);
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", __WEBPACK_IMPORTED_MODULE_5__providers_GlobalConstants__["d" /* apiUrl */] + 'order/payment_info', false);
        xhttp.setRequestHeader('Authorization', __WEBPACK_IMPORTED_MODULE_5__providers_GlobalConstants__["a" /* AuthHeader */]);
        try {
            xhttp.send(data);
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                var res = JSON.parse(xhttp.response);
                this.form['data'] = res['data'];
                this.form['message'] = res['message'];
                this.form['CustomError'] = null;
                console.log(this.form);
            }
            else {
                this.handler.handleError("API: " + xhttp.responseURL + " , ResponseStatus: " + xhttp.status);
                this.form['CustomError'] = 'Sorry! Connection Failed.';
                this.form['message'] = {};
                this.form['data'] = {};
                console.log(this.form);
            }
        }
        catch (err) {
            this.handler.handleError(err);
            this.form['CustomError'] = 'Check Your Internet Connection And Try Again.';
            this.form['message'] = null;
            this.form['data'] = null;
            console.log(this.form);
        }
        return this.form;
    };
    return ServiceProvider;
}());
ServiceProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__providers_MyErrorHandler__["a" /* MyErrorHandler */], __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], ServiceProvider);

//# sourceMappingURL=service.js.map

/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShoppingServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ShoppingServiceProvider = (function () {
    function ShoppingServiceProvider(http) {
        this.http = http;
        this.ShoppingCart = [];
        this.quantity = 0;
        this.form = {};
    }
    ShoppingServiceProvider.prototype.addtoCart = function (id, name, quantity, price, dish_type, SpecialRequest) {
        if (this.ShoppingCart[0] == null || this.ShoppingCart[0] == undefined || this.ShoppingCart[0] == []) {
            if (SpecialRequest == null || SpecialRequest == undefined) {
                SpecialRequest = "";
            }
            var newItem = { dish_id: id, dish_name: name, dish_qty: quantity, type: dish_type, dish_price: price, total: Math.round((Number(quantity) * Number(price)) * 100) / 100, request: SpecialRequest };
            console.log(newItem);
            this.ShoppingCart.push(newItem);
        }
        else {
            for (var i = 0; i < this.ShoppingCart.length; i++) {
                if (this.ShoppingCart[i]['dish_id'] == id) {
                    this.ShoppingCart[i]['dish_qty'] = this.ShoppingCart[i]['dish_qty'] + quantity;
                    this.ShoppingCart[i]['total'] = Math.round((Number(this.ShoppingCart[i]['dish_qty']) * Number(this.ShoppingCart[i]['dish_price'])) * 100) / 100;
                    if (SpecialRequest == null || SpecialRequest == undefined) {
                    }
                    else {
                        this.ShoppingCart[i]['request'] = SpecialRequest;
                    }
                    console.log(this.ShoppingCart[i]);
                    break;
                }
                else {
                    if (i == this.ShoppingCart.length - 1) {
                        if (SpecialRequest == null || SpecialRequest == undefined) {
                            SpecialRequest = "";
                        }
                        var newItem = { dish_id: id, dish_name: name, dish_qty: quantity, type: dish_type, dish_price: price, total: Math.round((Number(quantity) * Number(price)) * 100) / 100, request: SpecialRequest };
                        console.log(newItem);
                        this.ShoppingCart.push(newItem);
                        break;
                    }
                }
            }
        }
    };
    ShoppingServiceProvider.prototype.RemoveFromCart = function (dish_id) {
        var Copy_ShoppingCart = this.ShoppingCart;
        this.ShoppingCart = [];
        for (var i = 0; i < Copy_ShoppingCart.length; i++) {
            if (Copy_ShoppingCart[i]['dish_id'] == dish_id) {
                console.log('ItemRemove');
            }
            else {
                this.ShoppingCart.push(Copy_ShoppingCart[i]);
            }
        }
        return this.ShoppingCart;
    };
    ShoppingServiceProvider.prototype.PlusQuantity = function (dish_id) {
        for (var i = 0; i < this.ShoppingCart.length; i++) {
            if (this.ShoppingCart[i]['dish_id'] == dish_id) {
                this.ShoppingCart[i]['dish_qty'] = this.ShoppingCart[i]['dish_qty'] + 1;
                this.ShoppingCart[i]['total'] = Math.round((Number(this.ShoppingCart[i]['dish_qty']) * Number(this.ShoppingCart[i]['dish_price'])) * 100) / 100;
                break;
            }
        }
        return this.ShoppingCart;
    };
    ShoppingServiceProvider.prototype.MinusQuantity = function (dish_id) {
        for (var i = 0; i < this.ShoppingCart.length; i++) {
            if (this.ShoppingCart[i]['dish_id'] == dish_id) {
                if (this.ShoppingCart[i]['dish_qty'] > 1) {
                    this.ShoppingCart[i]['dish_qty'] = this.ShoppingCart[i]['dish_qty'] - 1;
                    this.ShoppingCart[i]['total'] = Math.round((Number(this.ShoppingCart[i]['dish_qty']) * Number(this.ShoppingCart[i]['dish_price'])) * 100) / 100;
                    break;
                }
                else {
                    break;
                }
            }
        }
        return this.ShoppingCart;
    };
    ShoppingServiceProvider.prototype.getShoppingCart = function () {
        return this.ShoppingCart;
    };
    ShoppingServiceProvider.prototype.clearCart = function () {
        this.ShoppingCart = [];
        this.quantity = 0;
    };
    ShoppingServiceProvider.prototype.getQuantity = function () {
        this.quantity = 0;
        for (var i = 0; i < this.ShoppingCart.length; i++) {
            this.quantity = this.quantity + this.ShoppingCart[i]['dish_qty'];
        }
        return this.quantity;
    };
    return ShoppingServiceProvider;
}());
ShoppingServiceProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], ShoppingServiceProvider);

//# sourceMappingURL=shopping-service.js.map

/***/ }),

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Promotions; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__menus_menus__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_service__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_analytics__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_MyErrorHandler__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var Promotions = (function () {
    function Promotions(service, handler, platform, ga, loadingCtrl, navCtrl, navParams) {
        this.service = service;
        this.handler = handler;
        this.platform = platform;
        this.ga = ga;
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.form = {};
        this.images = [{ image: "assets/image-placeholder.jpg" }];
        this.boolMessage = false;
        this.boolError = false;
        this.ios_css = false;
        if (this.platform.is('ios')) {
            this.ios_css = true;
        }
        else {
            this.ios_css = false;
        }
        this.load();
    }
    Promotions.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.ga.trackView('Promotions Page');
        })
            .catch(function (e) {
            _this.handler.handleError('Error starting GoogleAnalytics : ' + e);
        });
    };
    Promotions.prototype.Reload = function () {
        this.load();
    };
    Promotions.prototype.load = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: ' Loading...',
        });
        loading.present()
            .then(function () {
            var form2 = _this.service.loadSetting();
            console.log(form2);
            console.log(form2['data']);
            console.log(form2['message']);
            if (!(form2['data'] === undefined || form2['data'] === null || form2['data'] === [] || form2['data'] === '')) {
                var Copydata = form2['data'];
                _this.form = Copydata['promotions'];
                _this.images.pop();
                for (var data in _this.form['sliders']) {
                    _this.images.push({ image: _this.form['sliders'][data] });
                }
                _this.boolError = false;
                _this.boolMessage = false;
                loading.dismiss();
            }
            else if (!(form2['message'] === undefined || form2['message'] === null || form2['message'] === [] || form2['message'] === '')) {
                _this.boolMessage = true;
                _this.boolError = false;
                _this.Message = form2['message'];
                loading.dismiss();
            }
            else {
                _this.boolError = true;
                _this.boolMessage = true;
                _this.Message = form2['CustomError'];
                loading.dismiss();
            }
        });
    };
    Promotions.prototype.MenusPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__menus_menus__["a" /* MenusPage */], {}, { animate: false });
    };
    return Promotions;
}());
Promotions = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-Promotions',template:/*ion-inline-start:"F:\SubWay\SubWay\src\pages\Promotions\Promotions.html"*/'<ion-header *ngIf="!ios_css">\n  <ion-toolbar color="title" no-padding>\n    <ion-grid no-padding>\n      <ion-row align-items-center>\n        <ion-col col-1>\n        </ion-col>\n        <ion-col col-9>\n            <ion-title style="text-align:center;" no-padding>\n                 <img class="logotitle" src="assets/App-Logo.png"/>\n            </ion-title>\n        </ion-col>\n        <ion-col col-1>\n        </ion-col>\n        <ion-col col-1>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-toolbar>\n</ion-header>\n\n<ion-header *ngIf="ios_css">\n  <ion-toolbar color="title" no-padding>\n    <ion-grid no-padding>\n      <ion-row align-items-center>\n        <ion-col col-1>\n        </ion-col>\n        <ion-col col-9>\n               <img class="logotitle_ios" src="assets/App-Logo.png"/>\n        </ion-col>\n        <ion-col col-1>\n        </ion-col>\n        <ion-col col-1>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <span class="Slider-Span">\n  <ion-slides class="Slider-Span-Slides" initialSlide="0" pager="true" autoplay="3000" speed="200" no-padding>\n    <ion-slide *ngFor="let slide of images" no-padding Style="margin:0px;">\n        <img class="imgmg" [src]="slide.image" onError="this.src=\'assets/image-placeholder.jpg\';" alt="" />\n    </ion-slide>\n  </ion-slides>\n  </span>\n  <ion-grid>\n        <ion-row>\n              <ion-col>\n                <div class="hr-solid-line"> </div>\n              </ion-col>\n              <ion-col>\n              </ion-col>\n              <ion-col>\n                <div class="hr-solid-line"> </div>\n              </ion-col>\n        </ion-row>\n  </ion-grid>\n  <br>\n  <span class="Promotion-Span">\n    <p class="slogan_header"> {{form.slogan}} </p>\n    <p class="slogan"> {{form.sub_slogan}} </p>\n    <p class="Information">{{form.information}}</p>\n  </span>\n\n  <span *ngIf="boolMessage" class="MessageContainer">\n      <p class="Message">{{Message}}</p>\n      <p Style="text-align:center; margin=0px; padding: 7px 25px 7px 25px; display:block;" *ngIf="boolError">\n        <button ion-button class="button_text" (click)="Reload()"> RETRY </button>\n      </p>\n  </span>\n</ion-content>\n\n<ion-footer no-lines no-border class="zero-padding" color="white" *ngIf="!boolMessage">\n    <span Style="margin=0px; padding: 7px 25px 10px 25px; display:block; background:white;">\n      <button ion-button color="button_color" class="button_text" block (click)="MenusPage()"> View Restaurant Menus </button>\n    </span>\n</ion-footer>\n'/*ion-inline-end:"F:\SubWay\SubWay\src\pages\Promotions\Promotions.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__providers_service__["a" /* ServiceProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_MyErrorHandler__["a" /* MyErrorHandler */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_analytics__["a" /* GoogleAnalytics */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
], Promotions);

//# sourceMappingURL=Promotions.js.map

/***/ })

},[208]);
//# sourceMappingURL=main.js.map