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

  user: User = new User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userProvider: UserProvider, private alertCtrl: AlertController) {
  }

  login() {
    console.log(this.user)
    this.userProvider.login(this.user).subscribe(res => {
        console.log(res);
        localStorage.setItem('currentUser', this.user.username);
        this.navCtrl.setRoot(CalendarPage);
      }, err => {
        let alert = this.alertCtrl.create({
          title:'Credenziali errate',
          subTitle: 'Inserisci username e password corretti',
          buttons: ['Ok']
        });
        alert.present();

        console.log(err);
      }
    );
  }

  goToRegister(){
    this.navCtrl.push(RegisterPage);
  }

}
