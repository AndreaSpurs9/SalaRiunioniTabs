import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {URL_BACKEND} from "../../app/util/util";
import {Observable} from "rxjs/Observable";
import {AlertController} from "ionic-angular";

/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UserProvider {

  constructor(public http: Http, private alertCtrl: AlertController) {
  }

  login(user) {
    return this.http.post(URL_BACKEND + "login", user).map((data) => data.json());
  }



  findByUsername(user){
    return this.http.get(URL_BACKEND + "findByUsername/" + user.username).map((data) => data.json());
  }

  // register(user) {
  //   return this.http.post(URL_BACKEND + "register", user).map((data) => data.json());
  // }

  registerAlert(user) {
    return Observable.create(observer => {
      this.http.post(URL_BACKEND + 'register', user)
        .map(res => res.json())
        .subscribe(data => {
          console.log("Your data : ", data);
          observer.next(data);
        }, (err) => {
          console.log("Your error : ", err);
          observer.error(err);
          if (err.status == 409) {
            let confirm = this.alertCtrl.create({
              title: 'Username già in uso',
              subTitle: 'Seleziona un nuovo username',
              buttons: ['OK']
            });
            confirm.present();
          } else if (err.status == 500) {
            let confirm = this.alertCtrl.create({
              title: 'Dati non validi!',
              subTitle: 'Compila i campi in modo corretto',
              buttons: ['OK']
            });
            confirm.present();
          }
        });
    });
  }


  logout() {
    return this.http.get(URL_BACKEND + "logoutApp").map((data) => data.json());
  }

}
