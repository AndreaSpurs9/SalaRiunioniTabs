import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {URL_BACKEND} from "../../app/util/util";
import {Observable} from "rxjs/Observable";
import {AlertController} from "ionic-angular";

@Injectable()
export class EventProvider {

  constructor(public http: Http, private alertCtrl: AlertController) {
  }


  getAllEvents() {
    return this.http.get(URL_BACKEND + 'event/getAllEvent').map(res => res.json());
  }

  // createEvent(evento) {
  //   return this.http.post(URL_BACKEND + 'event/createEvent', evento).map((data) => data.json());
  // }

  deleteEvent(eventId: number) {
    return this.http.delete(URL_BACKEND + 'event/delete/' + eventId);
  }

  createEventAlert(event) {
    return Observable.create(observer => {
      this.http.post(URL_BACKEND + 'event/createEvent', event)
        .map(res => res.json())
        .subscribe(data => {
          console.log("Your data : ", data);
          observer.next(data);
        }, (err) => {
          console.log("Your error : ", err);
          observer.error(err);
          if (err.status == 409) {
            let confirm = this.alertCtrl.create({
              title: 'Orario non disponibile!',
              subTitle: 'La fascia oraria selezionata è già stata prenotata',
              buttons: ['OK']
            });
            confirm.present();
          } else if (err.status == 400) {
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


  editEventAlert(event) {
    return Observable.create(observer => {
      this.http.post(URL_BACKEND + 'event/editEvent', event)
        .map(res => res.json())
        .subscribe(data => {
          console.log("Your data : ", data);
          observer.next(data);
        }, (err) => {
          console.log("Your error : ", err);
          observer.error(err);
          if (err.status == 409) {
            let confirm = this.alertCtrl.create({
              title: 'Orario non disponibile!',
              subTitle: 'La fascia oraria selezionata è già stata prenotata',
              buttons: ['OK']
            });
            confirm.present();
          } else if (err.status == 400) {
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


}
