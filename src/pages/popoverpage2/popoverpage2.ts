import { Component } from '@angular/core';
import { ViewController, NavController, NavParams } from 'ionic-angular';
import { Payment } from '../payment/payment';

@Component({
  selector: 'page-popoverpage2',
  templateUrl: 'popoverpage2.html',
})
export class popoverpage2 {

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
  }

  close()
  {
    this.navCtrl.push(Payment,{},{animate:false});
    this.viewCtrl.dismiss('CreditCard');
  }

  PayPal()
  {
    this.viewCtrl.dismiss('PayPal');
  }

}
