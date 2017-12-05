import { Component } from '@angular/core';
import { Platform, AlertController, PopoverController, LoadingController, NavController, NavParams } from 'ionic-angular';
import { ShoppingServiceProvider } from '../../providers/shopping-service';
import { Order } from '../order/order';
import { PopoverPage } from '../popover/popover';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { MyErrorHandler } from '../../providers/MyErrorHandler';
import { ServiceProvider } from '../../providers/service';

@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html',
})
export class ItemDetails
{
	Dish_ID;
	Item;
	quantity;
  Total;
  type;
	form = {};
	SpecialRequest;
	Allergen : boolean = false;
	Nutrients : boolean = false;
	Description : boolean = false;
	SubItems : boolean = false;
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

      	this.Dish_ID = navParams.get('Dish_ID');
      	this.Item = navParams.get('Item');
        this.form['image'] = "assets/image-placeholder.jpg";
	  		this.quantity = 1;

	  		if(this.Item == undefined || this.Item == null)
	  		{
          this.type = 'dish';
	  			this.SubItems = false;
	  			this.Description = true;
	  			this.LoadDetails(this.Dish_ID);
	  		}
	  		else
	  		{
          this.Dish_ID = this.Item['id'];
          this.type = 'deal';
	  			this.loadItem(this.Item);
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

  ionViewWillEnter()
  {
      this.platform.ready().then(() => {
            this.ga.trackView('Item Details Page');
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
        if(this.Item == undefined || this.Item == null)
        {
          this.type = 'dish';
          this.SubItems = false;
          this.Description = true;
          this.LoadDetails(this.Dish_ID);
        }
        else
        {
          this.Dish_ID = this.Item['id'];
          this.type = 'deal';
          this.loadItem(this.Item);
        }
  }

  presentPopover(myEvent)
  {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }

  LoadDetails(dish_id)
  {
      let loading = this.loadingCtrl.create({
        content: ' Loading...',
      });

      loading.present()
      .then(()=> {
            let form2 = this.service.ItemDetails(dish_id);
            console.log(form2);

            if(!(form2['data']===undefined || form2['data']===null || form2['data']===[] || form2['data']===''))
            {
                      this.form = form2['data'];
                      this.form['image'] = this.form['images']['full'];
                      this.Total = this.form['price'];
                      if(this.form['allergens']== null||this.form['allergens']==undefined || this.form['allergens'][0]==null || this.form['allergens'][0]==undefined)
                      {
                        this.Allergen = false;
                      }
                      else
                      {
                        this.Allergen = true;
                      }

                      if(this.form['nutrients']==null||this.form['nutrients']==undefined)
                      {
                        this.Nutrients = false;
                      }
                      else
                      {
                        for(let i=0; i<this.form['nutrients'].length; i++)
                            {
                                      if(this.form['nutrients'][i].id == null)
                                      {
                                              this.form['nutrients'][i]['color'] = false;
                                              this.form['nutrients'][i]['white'] = false;
                                              this.Nutrients = false;
                                      }
                                      else
                                      {
                                          if(i==0 || i==2 || i==4 || i==6 || i==8 || i==10 || i==12)
                                          {
                                              this.form['nutrients'][i]['color'] = true;
                                              this.form['nutrients'][i]['white'] = false;
                                          }
                                          else
                                          {
                                              this.form['nutrients'][i]['color'] = false;
                                              this.form['nutrients'][i]['white'] = true;
                                          }
                                          this.Nutrients = true;
                                      }
                            }
                        }
                        this.boolError = false;
                        this.boolMessage = false;
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

	loadItem(Item)
	{
      let loading = this.loadingCtrl.create({
        content: ' Loading...',
      });

      loading.present()
      .then(()=> {
              this.form = this.Item;
              this.form['image'] = "assets/image-placeholder.jpg";
              this.Total = this.form['price'];
              this.SubItems = true;
              this.Description = false;
              if(this.form['allergens']== null||this.form['allergens']==undefined || this.form['allergens'][0]==null || this.form['allergens'][0]==undefined)
              {
                this.Allergen = false;
              }
              else
              {
                 this.Allergen = true;
              }

              if(this.form['nutrients']==null||this.form['nutrients']==undefined)
              {
                 this.Nutrients = false;
              }
              else
              {
                 this.Nutrients = true;
              }

              this.boolError = false;
              this.boolMessage = false;
              loading.dismiss();
      });
	}

	OrderPage()
	{
      this.shoppingcart.addtoCart(this.Dish_ID, this.form['title'], this.quantity, this.form['price'],this.type, this.SpecialRequest);
      this.navCtrl.push(Order, {}, {animate:false});
	}

  BackPage()
  {
      this.navCtrl.pop({animate:false});
  }

  Plus()
  {
      this.quantity = this.quantity + 1;
      this.Total = Number(this.Total) + Number(this.form['price']);
      this.Total = Math.round(this.Total * 100) / 100;
  }

  Minus()
  {
    if(this.quantity == 1 || this.quantity == 2)
    {
        this.quantity = 1;
        this.Total = this.form['price'];
    }
    else
    {
        this.quantity = this.quantity - 1;
        this.Total = Number(this.Total) - Number(this.form['price']);
        this.Total = Math.round(this.Total * 100) / 100;
    }
  }

}
