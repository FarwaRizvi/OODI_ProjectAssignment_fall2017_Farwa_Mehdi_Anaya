import { Component } from '@angular/core';
import { Platform, PopoverController, AlertController, LoadingController, NavController, NavParams } from 'ionic-angular';
import { ItemDetails } from '../item-details/item-details';
import { ShoppingServiceProvider } from '../../providers/shopping-service';
import { Order } from '../order/order';
import { PopoverPage } from '../popover/popover';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { MyErrorHandler } from '../../providers/MyErrorHandler';
import { ServiceProvider } from '../../providers/service';

@Component({
  selector: 'page-menus',
  templateUrl: 'menus.html',
})
export class MenusPage
{
  	form = {};
    boolMessage : boolean = false;
    boolError : boolean = false;
    ios_css : boolean = false;
    Message;
    Qty;
    boolQty : boolean = false;

  	constructor(public service: ServiceProvider, public handler: MyErrorHandler, public platform: Platform, private ga: GoogleAnalytics, private alertCtrl: AlertController, public popoverCtrl: PopoverController, public shoppingcart: ShoppingServiceProvider, public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams)
  	{
        if (this.platform.is('ios'))
        {
          this.ios_css = true;
        }
        else
        {
          this.ios_css = false;
        }
        this.loadMenu();
  	}

    ionViewWillEnter()
    {
        this.platform.ready().then(() => {
            this.ga.trackView('Menu Page');
        })
        .catch(e => {
            this.handler.handleError('Error starting GoogleAnalytics : '+e);
        });

        this.Qty = this.shoppingcart.getQuantity();
        if (this.Qty==0)
        {
            this.boolQty = false;
        }
        else
        {
            this.boolQty = true;
        }
    }

    BasketEmpty()
    {
        let alert = this.alertCtrl.create({
          title: 'Basket is Empty',
          subTitle: 'You have to add something first',
          buttons: ['OK']
        });
        alert.present();
    }

    presentPopover(myEvent)
    {
      let popover = this.popoverCtrl.create(PopoverPage,{},{cssClass:'abc'});

      popover.onDidDismiss(data => {
      });

      popover.present({
        ev: myEvent
      });
    }

    CartIcon()
    {
        if (this.Qty==0)
        {
            this.BasketEmpty();
        }
        else
        {
            this.navCtrl.push(Order, {}, {animate:false});
        }
    }

    Reload()
    {
        this.loadMenu();
    }

    loadMenu()
    {
        let loading = this.loadingCtrl.create({
          content: ' Loading...',
        });

        loading.present()
        .then(()=> {
              let form2 = this.service.loadMenu();
              console.log(form2);

              if(!(form2['data']===undefined || form2['data']===null || form2['data']===[] || form2['data']===''))
              {
                        this.form = form2['data'];
                        this.form['categories'] = this.form['menu']['categories'];
                        this.boolMessage = false;
                        this.boolError = false;
                        loading.dismiss();
              }
              else if (!(form2['message']===undefined || form2['message']===null || form2['message']===[] || form2['message']===''))
              {
                        this.boolMessage = true;
                        this.boolError = false;
                        this.Message = form2['message'];
                        loading.dismiss();
              }
              else
              {
                        this.boolError = true;
                        this.boolMessage = true;
                        this.Message = form2['CustomError'];
                        loading.dismiss();
              }
        });
    }

  	ItemDetails(id)
  	{
  		this.navCtrl.push(ItemDetails, {Dish_ID : id}, {animate:false});
  	}

  	ItemDetailsSubItems(item)
  	{
  		this.navCtrl.push(ItemDetails, {Item : item}, {animate:false});
  	}

  	BackPage()
	  {
		  this.navCtrl.pop({animate:false});
	  }
}
