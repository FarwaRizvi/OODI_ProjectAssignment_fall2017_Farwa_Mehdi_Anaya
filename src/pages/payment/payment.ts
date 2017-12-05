import { ViewChild, Component } from '@angular/core';
import { Platform, AlertController, LoadingController, NavController, NavParams } from 'ionic-angular';
import { DateTime } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Promotions } from '../Promotions/Promotions';
import { apiUrl } from '../../providers/GlobalConstants';
import { AuthHeader } from '../../providers/GlobalConstants';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { MyErrorHandler } from '../../providers/MyErrorHandler';
import { ServiceProvider } from '../../providers/service';

@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class Payment
{
  @ViewChild('DateTime') dateTime: DateTime;
  name;
  number;
  date;
  code;
  Month;
  Year;
  data;
  orderID;
  ios_css : boolean = false;
  boolMessage : boolean = false;
  boolError : boolean = false;
  Message;
  TodaysDate;
  MinYear;
  ArrayYear : Array<any> = [];
  SaveDetails: boolean = true;

  constructor(public service: ServiceProvider, public handler: MyErrorHandler, public platform: Platform, private ga: GoogleAnalytics, public statusBar: StatusBar, public loadingCtrl: LoadingController, private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams)
  {
          if (this.platform.is('ios'))
          {
            this.ios_css = true;
          }
          else
          {
            this.ios_css = false;
          }

          this.data = navParams.get('data');
          this.date = new Date(Date.now());
          this.MinYear = this.date.getFullYear();
          for(let i=0; i<31; i++)
          {
            this.ArrayYear.push({'id': this.MinYear+i, 'Year': this.MinYear+i});
          }
  }

  ionViewWillEnter()
  {
        this.platform.ready().then(() => {
            this.ga.trackView('Payment Page');
        })
        .catch(e => {
          console.log('Error starting GoogleAnalytics', e);
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
                  this.navCtrl.setRoot(Promotions, {}, {animate:false});
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
            if(this.name==null||this.number==null||this.code==null||this.Month==null||this.Year==null)
            {
                    loading.dismiss();
                    this.Failed('Required Fields Are Empty');
            }
            else
            {
                if(this.number.length==16)
                {
                    let data = new FormData();
                    data.append('cc_no', this.number );
                    data.append('cc_cvv', this.code );
                    data.append('cc_exp_month', this.Month );
                    data.append('cc_exp_year', this.Year);
                    data.append('order_id', this.data['order_id']);
                    data.append('device_id', this.data['device_id']);

                    let form2 = this.service.PaymentDetails(data);
                    console.log(form2);
                    if(!(form2['data']===undefined || form2['data']===null || form2['data']===[] || form2['data']===''))
                    {
                          this.boolError = false;
                          this.boolMessage = false;
                          loading.dismiss();
                          this.number = '';
                          this.name = '';
                          this.code = '';
                          this.date = '';
                          this.Year = '';
                          this.Month = '';
                          this.SaveDetails = true;
                          this.Success(form2['message']);
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
                    this.Failed("CreditCard Number is not Valid");
                }
            }
        });
  }

  BackPage()
  {
      this.navCtrl.pop({animate:false});
  }

  SelectedCheckbox_update()
  {

  }

}
