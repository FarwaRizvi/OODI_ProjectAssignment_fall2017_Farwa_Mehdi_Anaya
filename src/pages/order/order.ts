import { Component } from '@angular/core';
import { Platform, AlertController, NavController, NavParams } from 'ionic-angular';
import { AddAddress } from '../AddAddress/AddAddress';
import { ShoppingServiceProvider } from '../../providers/shopping-service';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { MyErrorHandler } from '../../providers/MyErrorHandler';

@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class Order
{
  Order : Array<any> = [];
  CopyCart: Array<any> = [];
  ios_css : boolean = false;
  Subtotal;
  Amount;

  constructor(public handler: MyErrorHandler, public platform: Platform, private ga: GoogleAnalytics, private alertCtrl: AlertController, public shoppingcart: ShoppingServiceProvider, public navCtrl: NavController, public navParams: NavParams)
  {
          if (this.platform.is('ios'))
          {
            this.ios_css = true;
          }
          else
          {
            this.ios_css = false;
          }
          this.Subtotal = 0;
          this.Amount = 0;
  }

  ionViewWillEnter()
  {
        this.platform.ready().then(() => {
            this.ga.trackView('Order Page');
        })
        .catch(e => {
            this.handler.handleError('Error starting GoogleAnalytics : '+e);
        });
  }

  ionViewDidLoad()
  {
    this.Order = this.shoppingcart.getShoppingCart();
    for(let i=0; i<this.Order.length; i++)
    {
        this.Subtotal = this.Subtotal + this.Order[i]['total'];
    }
    this.Subtotal = Math.round(this.Subtotal*100)/100;
    this.TotalAmount(this.Subtotal);
  }

  Continue()
  {
      this.navCtrl.push(AddAddress, {}, {animate:false});
  }

  BackPage()
  {
      this.navCtrl.pop({animate:false});
  }

  Plus(dish_id,dish_price,dish_qty)
  {
        this.Order = this.shoppingcart.PlusQuantity(dish_id);

        let number = 0;
        for(let i=0; i<this.Order.length; i++)
        {
              number = number + (this.Order[i]['dish_price']*this.Order[i]['dish_qty']);
        }
        this.Subtotal = number;
        this.Subtotal = Math.round(this.Subtotal*100)/100;
        this.TotalAmount(this.Subtotal);
  }

  Minus(dish_id,dish_price,dish_qty)
  {
    if(dish_qty>1)
    {
        this.Order = this.shoppingcart.MinusQuantity(dish_id);
        let number = 0;
        for(let i=0; i<this.Order.length; i++)
        {
          number = number + (this.Order[i]['dish_price']*this.Order[i]['dish_qty']);
        }
        this.Subtotal = number;
        this.Subtotal = Math.round(this.Subtotal*100)/100;
        this.TotalAmount(this.Subtotal);
    }
  }

  RemoveItem(dish_id,total)
  {
      this.Order = this.shoppingcart.RemoveFromCart(dish_id);
      let number = 0;
      for(let i=0; i<this.Order.length; i++)
      {
        number = number + (this.Order[i]['dish_price']*this.Order[i]['dish_qty']);
      }
      this.Subtotal = number;
      this.Subtotal = Math.round(this.Subtotal*100)/100;
      this.TotalAmount(this.Subtotal);
      if(this.Subtotal == 0 && this.Order.length==0)
      {
              this.BasketEmpty();
      }
  }

  BasketEmpty()
  {
      let alert = this.alertCtrl.create({
        title: 'Basket is Empty',
        subTitle: 'You have to add something first',
        buttons: [{
            text: 'OK',
            handler: () => {
              this.navCtrl.pop({animate:false});
            }
        }]
      });
      alert.present();
  }

  TotalAmount(subtotal)
  {
      let percent = Number(0.12) * Number(subtotal);
      let number = percent + Number(subtotal) + 10;
      this.Amount = Math.round(number*100)/100;;
  }

}
