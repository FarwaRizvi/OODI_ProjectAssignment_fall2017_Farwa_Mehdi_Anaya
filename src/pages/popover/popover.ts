import { Component } from '@angular/core';
import { ViewController, NavController, NavParams } from 'ionic-angular';
import { MyOrders } from '../my-orders/my-orders';

@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage
{
  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams)
  {

  }

  close()
  {
    this.navCtrl.push(MyOrders,{},{animate:false});
    this.viewCtrl.dismiss();
  }

}
