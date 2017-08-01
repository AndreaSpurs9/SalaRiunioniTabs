import {Component} from '@angular/core';
import {EventProvider} from "../../providers/event/event";
import {Event} from "../../app/model/Event";
import {AlertController, NavController, NavParams} from "ionic-angular";
import {CalendarPage} from "../calendar/calendar";

@Component({
  selector: 'page-modifica',
  templateUrl: 'modifica.html',
})
export class ModificaPage {
  evento = new Event();
  giorno: string;
  flag: boolean;
  today: string;
  minDate: string;
  maxDate: string;
  dataSelezionata: string;
  startPulita: string;
  endPulita: string;

  constructor(private navController: NavController, private navParams: NavParams, private eventProvider: EventProvider, private alertCtrl: AlertController) {

  }

  ionViewWillEnter() {
    this.today = new Date().toISOString();
    this.minDate = "2017-01-01";
    this.maxDate = "2030-12-31";
    this.evento = this.navParams.get('eventoDaModificare');
    this.giorno = this.evento.giorno;
    console.log(this.evento.startTime + "start");
    console.log(this.evento.giorno + "giorno")

    let giornoStartSplit = new Array();
    let giornoEndSplit = new Array();
    giornoStartSplit = this.evento.startTime.toString().split(" ");
    giornoEndSplit = this.evento.endTime.toString().split(" ");
    this.startPulita = giornoStartSplit[4].slice(0, 5);
    this.endPulita = giornoEndSplit[4].slice(0, 5);


  }

  modifica() {
    let giornoSplit = this.giorno.split("-");
    let giornoOrdinato: string = giornoSplit[2] + "/" + giornoSplit[1] + "/" + giornoSplit[0];
    if (this.flag == true) {
      this.evento.startTime = this.giorno + " 09:00";
      this.evento.endTime = this.giorno + " 18:00";
      this.evento.allDay = true;
    } else {
      this.evento.startTime = this.giorno + " " + this.startPulita;
      console.log(this.evento.startTime);
      this.evento.endTime = this.giorno + " " + this.endPulita;
      console.log(this.evento.endTime);
      this.evento.allDay = false;
    }
    this.eventProvider.editEventAlert(this.evento).subscribe(res => {
      console.log(res);
      let confirm = this.alertCtrl.create({
        title: 'Prenotazione inserita',
        message:  atob(localStorage.getItem('currentUser')) + ' hai modificato la prenotazione della sala riunioni per il giorno ' + giornoOrdinato + ' con il seguente orario: ' + this.evento.startTime.substring(11, 16) + " -> " + this.evento.endTime.substring(11, 16),
        buttons: ['OK']
      });
      confirm.present();
      this.navController.setRoot(CalendarPage);
    }, err => {
      console.log(err);
    });
  }
}
