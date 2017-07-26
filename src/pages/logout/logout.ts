import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {UserProvider} from "../../providers/user/user";

@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private userProvider: UserProvider) {
  }


  ionViewDidEnter() {
    localStorage.removeItem('currentUser');
    this.userProvider.logout().subscribe(res => {
      console.log(res);
      this.navCtrl.setRoot(LoginPage);
    }, err => {
      console.log(err);
    });
  }
}


