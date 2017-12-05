import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { Promotions } from '../pages/Promotions/Promotions';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ServiceProvider } from '../providers/service';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { MyErrorHandler } from '../providers/MyErrorHandler';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage = Promotions;
  pages: Array<{title: string, component: any}>;

  constructor(
    public handler: MyErrorHandler,
    private ga: GoogleAnalytics,
    public platform: Platform,
    public service: ServiceProvider,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'My First List', component: Promotions }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
        this.statusBar.backgroundColorByHexString('#08400F');
        setTimeout(() => {
          this.splashScreen.hide();
        }, 50);
        this.ga.startTrackerWithId('UA-107775151-1')
        .then(() => {

        })
        .catch(e => this.handler.handleError("ERROR: "+e));
    })
    .catch(e => this.handler.handleError("ERROR: "+e));
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
