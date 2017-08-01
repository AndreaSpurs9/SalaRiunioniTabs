import {Component} from '@angular/core';
import {EventProvider} from "../../providers/event/event";
import {Event} from "../../app/model/Event";
import {AlertController, NavController, NavParams} from "ionic-angular";
import {CalendarPage} from "../calendar/calendar";


@Component({
  selector: 'page-prenota',
  templateUrl: 'prenota.html',
})
export class PrenotaPage {

  evento: Event = new Event;
  giorno: string;
  startTime: string;
  endTime: string;
  flag: boolean;
  today: string;
  minDate: string;
  maxDate: string;
  dataSelezionata: string;

  constructor(private navController: NavController, private navParams: NavParams, private eventProvider: EventProvider, private alertCtrl: AlertController) {

  }

  ionViewWillEnter() {
    this.today = new Date().toISOString();
    this.minDate = "2017-01-01";
    this.maxDate = "2030-12-31";
    this.dataSelezionata = this.navParams.get('oggi');
    console.log("prenota" + this.dataSelezionata)
  }

  prenotazione() {
    this.giorno = this.dataSelezionata.slice(0, 10);
    this.evento.giorno = this.giorno;
    let giornoSplit = this.giorno.split("-");
    let giornoOrdinato: string = giornoSplit[2] + "/" + giornoSplit[1] + "/" + giornoSplit[0];
    if (this.flag == true) {
      this.evento.startTime = this.giorno + " 09:00";
      this.evento.endTime = this.giorno + " 18:00";
      this.evento.allDay = true;
    } else {
      this.evento.startTime = this.giorno + " " + this.startTime;
      console.log(this.evento.startTime);
      this.evento.endTime = this.giorno + " " + this.endTime;
      console.log(this.evento.endTime);
      this.evento.allDay = false;
    }

    this.eventProvider.createEventAlert(this.evento).subscribe(res => {
      console.log(res);
      let confirm = this.alertCtrl.create({
        title: 'Prenotazione inserita',
        message:  atob(localStorage.getItem('currentUser')) + ' hai prenotato la sala riunioni per il giorno ' + giornoOrdinato + ' con il seguente orario: ' + this.evento.startTime.substring(11, 16) + " -> " + this.evento.endTime.substring(11, 16),
        buttons: ['OK']
      });
      confirm.present();
      this.navController.setRoot(CalendarPage);
    }, err => {
      console.log(err);
      // let confirm = this.alertCtrl.create({
      //   title: 'Orario non disponibile!',
      //   subTitle: 'La fascia oraria selezionata è già stata prenotata',
      //   buttons: ['OK']
      // });
      // confirm.present();
    });
  }

}
