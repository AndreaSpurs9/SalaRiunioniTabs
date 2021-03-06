import {Component} from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";
import {User} from "../../app/model/User";
import {CalendarPage} from "../calendar/calendar";
import {RegisterPage} from "../register/register";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = new User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userProvider: UserProvider, private alertCtrl: AlertController) {
  }

  ionViewWillEnter() {
  }

  login() {
    console.log(this.user);
    this.userProvider.login(this.user).subscribe(res => {
        localStorage.setItem('currentUser', btoa(this.user.username));
        localStorage.setItem('currentPassword', btoa(this.user.password));

        this.userProvider.findByUsername(this.user).subscribe(res => {
          console.log("findbyusername");
          let userDetails: User = res;
          localStorage.setItem('currentUserProfile', userDetails.profileType.toString());
          this.navCtrl.setRoot(CalendarPage);
        }, err => {
          console.log(err);
        })


      }, err => {
        let alert = this.alertCtrl.create({
          title: 'Credenziali errate',
          subTitle: 'Inserisci username e password corretti',
          buttons: ['Ok']
        });
        alert.present();

        console.log(err);
      }
    );

  }

  goToRegister() {
    this.navCtrl.push(RegisterPage);
  }

}
