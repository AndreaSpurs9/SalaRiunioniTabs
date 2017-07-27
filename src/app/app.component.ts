import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {CalendarPage} from "../pages/calendar/calendar";
import {UserProvider} from "../providers/user/user";
import {User} from "./model/User";

@Component({
  templateUrl: 'app.html'
})
export class SalaRiunioni {
  @ViewChild(Nav) nav: Nav;
  userDaLoggare = new User;
  rootPage: any = CalendarPage;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private userProvider: UserProvider) {
    this.initializeApp();

    this.userDaLoggare.username = atob(localStorage.getItem('currentUser'));
    this.userDaLoggare.password = atob(localStorage.getItem('currentPassword'));

    this.userProvider.login(this.userDaLoggare).subscribe(res => {
      }, err => {
        console.log(err);
      }
    );


    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'Calendario', component: CalendarPage},
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
