//Other Imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
//Pages
import { Promotions } from '../pages/Promotions/Promotions';
import { MenusPage } from '../pages/menus/menus';
import { ItemDetails } from '../pages/item-details/item-details';
import { Order } from '../pages/order/order';
import { AddAddress } from '../pages/AddAddress/AddAddress';
import { PopoverPage } from '../pages/popover/popover';
import { MyOrders } from '../pages/my-orders/my-orders';
import { Payment } from '../pages/payment/payment';
//Services And Plugins
import { MyErrorHandler } from '../providers/MyErrorHandler';
import { ServiceProvider } from '../providers/service';
import { ShoppingServiceProvider } from '../providers/shopping-service';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Device } from '@ionic-native/device';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

@NgModule({
  declarations: [
    MyApp,
    Promotions,
    MenusPage,
    ItemDetails,
    Order,
    AddAddress,
    PopoverPage,
    MyOrders,
    Payment
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
        backButtonIcon: "ios-arrow-back",
        tabSubPages:false,
        scrollPadding: false,
        scrollAssist: true,
        autoFocusAssist: false,
        mode: 'md'
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Promotions,
    MenusPage,
    ItemDetails,
    Order,
    AddAddress,
    PopoverPage,
    MyOrders,
    Payment
  ],
  providers: [
    ServiceProvider,
    MyErrorHandler,
    ShoppingServiceProvider,
    StatusBar,
    SplashScreen,
    Device,
    GoogleAnalytics,
    {provide: ErrorHandler, useClass: MyErrorHandler},
  ]
})
export class AppModule {}
