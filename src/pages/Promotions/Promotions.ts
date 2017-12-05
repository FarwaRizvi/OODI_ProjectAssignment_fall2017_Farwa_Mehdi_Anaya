import { Component } from '@angular/core';
import { Platform, LoadingController, NavController, NavParams } from 'ionic-angular';
import { MenusPage } from '../menus/menus';
import { ServiceProvider } from '../../providers/service';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { MyErrorHandler } from '../../providers/MyErrorHandler';

@Component({
  selector: 'page-Promotions',
  templateUrl: 'Promotions.html'
})

export class Promotions
{
    	form = {};
    	images = [{ image: "assets/image-placeholder.jpg" }]
      boolMessage : boolean = false;
      boolError : boolean = false;
      ios_css : boolean = false;
      Message;

      constructor(public service: ServiceProvider, public handler: MyErrorHandler, public platform: Platform, private ga: GoogleAnalytics, public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams)
      {
            if (this.platform.is('ios'))
            {
              this.ios_css = true;
            }
            else
            {
              this.ios_css = false;
            }
            this.load();
      }

      ionViewWillEnter()
      {
            this.platform.ready().then(() => {
                this.ga.trackView('Promotions Page');
            })
            .catch(e => {
                this.handler.handleError('Error starting GoogleAnalytics : '+e);
            });
      }

      Reload()
      {
          this.load();
      }

      load()
      {
          let loading = this.loadingCtrl.create({
            content: ' Loading...',
          });

          loading.present()
          .then(()=> {
                let form2 = this.service.loadSetting();
                console.log(form2);
                console.log(form2['data']);
                console.log(form2['message']);
                if (!(form2['data']===undefined || form2['data']===null || form2['data']===[] || form2['data']===''))
                {
                            let Copydata = form2['data'];
                            this.form = Copydata['promotions'];
                            this.images.pop();

                            for(let data in this.form['sliders'])
                            {
                                    this.images.push({ image: this.form['sliders'][data]});
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

      MenusPage()
      {
          this.navCtrl.push(MenusPage,{},{animate:false});
      }

}
