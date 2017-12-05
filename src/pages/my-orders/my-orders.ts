import { Component } from '@angular/core';
import { Platform, AlertController, NavController, LoadingController, NavParams } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { MyErrorHandler } from '../../providers/MyErrorHandler';
import { ServiceProvider } from '../../providers/service';

@Component({
  selector: 'page-my-orders',
  templateUrl: 'my-orders.html',
})
export class MyOrders
{
  orders;
  Title : Array<any> = [];
  boolMessage : boolean = false;
  boolError : boolean = false;
  ios_css : boolean = false;
  Message;

  constructor(public service: ServiceProvider, public handler: MyErrorHandler, public platform: Platform, private ga: GoogleAnalytics, private alertCtrl: AlertController, private device: Device, public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams)
  {
      if (this.platform.is('ios'))
      {
        this.ios_css = true;
      }
      else
      {
        this.ios_css = false;
      }
      this.Load(this.device.uuid);
  }

  ionViewWillEnter()
  {
        this.platform.ready().then(() => {
            this.ga.trackView('Order History Page');
        })
        .catch(e => {
            this.handler.handleError('Error starting GoogleAnalytics : '+e);
        });
  }

  Reload()
  {
      this.Load(this.device.uuid);
  }

  AlertMessage(message)
  {
      let alert = this.alertCtrl.create({
        subTitle: message,
        buttons: [{
            text: 'OK',
        }]
      });
      alert.present();
  }

  Load(Device_ID)
  {
        let loading = this.loadingCtrl.create({
          content: ' Loading...',
        });

        loading.present()
        .then(()=> {
            let form2 = this.service.OrderHistory(Device_ID);
            //let form2 = this.service.OrderHistory('75737a48682c7430');
            console.log(form2);
            let a=0;
            console.log(form2['data']);
            console.log(form2['message']);
            if(!(form2['message']===undefined || form2['message']===null || form2['message']===[] || form2['message']===''))
            {
                  let msg = form2['message'];
                  this.AlertMessage(msg['0']);
                  this.boolError = false;
                  this.boolMessage = false;
                  loading.dismiss();
            }
            else if(!(form2['data']===undefined || form2['data']===null || form2['data']===[] || form2['data']===''))
            {
                  loading.dismiss();
                  this.orders = form2['data']['orders'];
                  for(let j=0; j<this.orders.length; j++)
                  {
                      if(this.orders[j].length==0)
                      {

                      }
                      else
                      {
                          let data = this.orders[j]['items'];
                          let text = '';
                          for (let i=0; i<data.length; i++)
                          {
                            if(i==0)
                            {
                                text = "<p class='number'>"+data[i]['item_qty']+" X </p><p class='text'> "+data[i]['item_name']+"</p>";
                            }
                            else
                            {
                                text = text + "+ <p class='number'>"+data[i]['item_qty']+" X </p><p class='text'> "+data[i]['item_name']+"</p>";
                            }
                          }
                          this.orders[j]['CustomTitle']=text;
                      }
                  }
                  this.boolError = false;
                  this.boolMessage = false;
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

  BackPage()
  {
      this.navCtrl.pop({animate:false});
  }
}
