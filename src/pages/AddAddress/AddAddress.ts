import { Component } from '@angular/core';
import { Platform, PopoverController, AlertController, LoadingController, NavController, NavParams } from 'ionic-angular';
import { ShoppingServiceProvider } from '../../providers/shopping-service';
import { Device } from '@ionic-native/device';
import { Promotions } from '../Promotions/Promotions';
import { Payment } from '../payment/payment';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { MyErrorHandler } from '../../providers/MyErrorHandler';
import { ServiceProvider } from '../../providers/service';
import { RestaurantID } from '../../providers/GlobalConstants';

@Component({
  selector: 'page-AddAddress',
  templateUrl: 'AddAddress.html',
})
export class AddAddress
{
  Email;
  MobileNumber;
  Address;
  Comments;
  data;
  HardwareID;
  bool_CashonDelivery : boolean = false;
  bool_PickFromRestaurant : boolean = false;
  bool_CreditCardPayment : boolean = false;
  newOrder : Array<any> = [];
  form = {};
  boolMessage : boolean = false;
  boolError : boolean = false;
  ios_css : boolean = false;
  Message;

  constructor(public service: ServiceProvider, public handler: MyErrorHandler, public platform: Platform, private ga: GoogleAnalytics, public popoverCtrl: PopoverController, private alertCtrl: AlertController, private device: Device, public loadingCtrl: LoadingController, public shoppingcart: ShoppingServiceProvider, public navCtrl: NavController, public navParams: NavParams)
  {
          if (this.platform.is('ios'))
          {
            this.ios_css = true;
          }
          else
          {
            this.ios_css = false;
          }
          this.HardwareID = this.device.uuid;
          this.CashonDelivery();
  }

  ionViewWillEnter()
  {
        this.platform.ready().then(() => {
            this.ga.trackView('Checkout Page');
        })
        .catch(e => {
            this.handler.handleError('Error starting GoogleAnalytics : '+e);
        });
  }

  Failed(message)
  {
      let alert = this.alertCtrl.create({
        title: 'Failed',
        subTitle: message,
        buttons: ['OK']
      });
      alert.present();
  }

  Success(message)
  {
      let alert = this.alertCtrl.create({
        title: 'Success',
        subTitle: message,
        buttons: [{
            text: 'OK',
            handler: () => {
              if(this.bool_CreditCardPayment == true)
              {
                  this.navCtrl.push(Payment, {data: this.data}, {animate:false});
              }
              else
              {
                  this.navCtrl.setRoot(Promotions, {}, {animate:false});
              }
            }
        }]
      });
      alert.present();
  }

  Submit()
  {
        let loading = this.loadingCtrl.create({
          content: ' Loading...',
          showBackdrop: false,
        });

        loading.present()
        .then(()=> {
              if(this.Email==null || this.MobileNumber==null || this.Address==null)
              {
                      loading.dismiss();
                      this.Failed('Fields Are Empty');
              }
              else
              {
                  if(this.validateEmail(this.Email)==true)
                  {
                          this.newOrder = [];
                          let cart  = this.shoppingcart.getShoppingCart();
                          for(let i=0; i<cart.length; i++)
                          {
                              this.newOrder.push({"quantity":cart[i]['dish_qty'], "id":cart[i]['dish_id'], "type":cart[i]['type'], "request": cart[i]['request']});
                          }
                          this.form = {"hardware_id" : this.HardwareID,
                                        "address" : this.Address,
                                        "phone" : this.MobileNumber,
                                        "restaurant_id" : RestaurantID,
                                        "email" : this.Email,
                                        "comments" : this.Comments,
                                        "items" : this.newOrder
                                        };
                          if(this.bool_CashonDelivery == true)
                          {
                              this.form['paymentMethod'] = "1";
                          }
                          if(this.bool_PickFromRestaurant == true)
                          {
                              this.form['paymentMethod'] = "2";
                          }
                          if(this.bool_CreditCardPayment == true)
                          {
                              this.form['paymentMethod'] = "3";
                          }

                          let form2 = this.service.PlaceOrder(this.form);
                          console.log(form2);
                          console.log(form2['data']);
                          console.log(form2['message']);
                          if(!(form2['data']===undefined || form2['data']===null || form2['data']===[] || form2['data']===''))
                          {
                                this.boolError = false;
                                this.boolMessage = false;
                                loading.dismiss();
                                if(form2['message'] == 'Order register successfully.')
                                {
                                      this.data = form2['data'];
                                      this.Email = '';
                                      this.MobileNumber = '';
                                      this.Address = '';
                                      this.Comments = '';
                                      this.shoppingcart.clearCart();
                                      this.Success(form2['message']);
                                }
                          }
                          else if(!(form2['message']===undefined || form2['message']===null || form2['message']===[] || form2['message']===''))
                          {
                                this.boolError = false;
                                this.boolMessage = false;
                                loading.dismiss();
                                this.Failed(form2['message']);
                          }
                          else
                          {
                                this.boolError = true;
                                this.boolMessage = true;
                                this.Message = form2['CustomError'];
                                loading.dismiss();
                          }
                  }
                  else
                  {
                          loading.dismiss();
                          this.Failed('Email Address is not Valid');
                  }
              }
       });
  }

  validateEmail(email)
  {
        let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

        if (reg.test(email) == false)
        {
            return false;
        }
        else
        {
            return true;
        }
  }

  BackPage()
  {
      this.navCtrl.pop({animate:false});
  }

  CashonDelivery()
  {
      this.bool_CashonDelivery = true;
      this.bool_PickFromRestaurant = false;
      this.bool_CreditCardPayment = false;
  }

  PickFromRestaurant()
  {
      this.bool_CashonDelivery = false;
      this.bool_PickFromRestaurant = true;
      this.bool_CreditCardPayment = false;
  }

  CreditCardPayment (myEvent)
  {
      this.bool_CashonDelivery = false;
      this.bool_PickFromRestaurant = false;
      this.bool_CreditCardPayment = true;
  }

}
