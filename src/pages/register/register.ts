import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";
import {User} from "../../app/model/User";
import {LoginPage} from "../login/login";
import {UserProfileType} from "../../app/model/UserProfileType";

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user: User = new User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userProvider: UserProvider, private alertCtrl: AlertController) {
  }

  register() {
    console.log(this.user)
    this.user.profileType = UserProfileType.ROLE_USER;
    this.userProvider.register(this.user).subscribe(res => {
        console.log(res);
        this.navCtrl.setRoot(LoginPage);
      }, err => {
      let alert = this.alertCtrl.create({
        title: 'Username già in uso',
        subTitle: 'Inserisci un nuovo username',
        buttons: ['Ok']
      });
      alert.present();
        console.log(err);
      }
    );
  }

}

