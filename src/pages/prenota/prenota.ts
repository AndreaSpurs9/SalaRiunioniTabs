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

  flush() {
    // this.navController.setRoot(PrenotaPage)
  }


  prenotazione() {
    this.giorno = this.dataSelezionata.slice(0, 10);
    let giornoSplit = this.giorno.split("-");
    let giornoOrdinato: string = giornoSplit[2] + "/" + giornoSplit[1] + "/" + giornoSplit[0];
    console.log("giorno " + this.giorno);
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

    this.eventProvider.createEvent(this.evento).subscribe(res => {
      console.log(res);
      let confirm = this.alertCtrl.create({
        title: 'Prenotazione inserita',
        message: localStorage.getItem('currentUser') + ' hai prenotato la sala riunioni per il giorno ' + giornoOrdinato + ' con il seguente orario: ' + this.evento.startTime.substring(11, 16) + " -> " + this.evento.endTime.substring(11, 16),
        buttons: ['OK']
      });
      confirm.present();
      this.navController.setRoot(CalendarPage);
    }, err => {
      console.log(err);
      let confirm = this.alertCtrl.create({
        title: 'Orario non disponibile!',
        subTitle: 'La fascia oraria selezionata è già stata prenotata',
        buttons: ['OK']
      });
      confirm.present();
    });
  }


  // controlloPrenotazione() : Promise<string>{
  //   let listaEventi = new Array();
  //   this.eventProvider.getAllEvents().subscribe(res => {
  //     listaEventi = res;
  //     console.log("lista metodo standalone" + listaEventi);
  //     console.log(listaEventi);
  //     let parsedStartTime = parseInt(this.startTime.replace(":", ""));
  //     console.log("nuova prenotazione start " + parsedStartTime);
  //     let parsedEndTime = parseInt(this.endTime.replace(":", ""));
  //     console.log("nuova prenotazione end " + parsedEndTime);
  //
  //
  //     for (let a of listaEventi) {
  //       if (a.startTime.includes(this.giorno)) {
  //         let startA = parseInt(a.startTime.slice(11, 16).replace(":", ""));
  //         console.log("start prenotato " + startA);
  //         let endA = parseInt(a.endTime.slice(11, 16).replace(":", ""));
  //         console.log("end prenotato " + endA);
  //
  //         if ((startA >= parsedStartTime && startA <= parsedEndTime) || (endA >= parsedStartTime && endA <= parsedEndTime)) {
  //           this.verifica = 1; //prenotato
  //           console.log("sono nel porcoddio di if")
  //         } else { //libero
  //           this.verifica = 0;
  //           console.log("sono nel porcamadonna di else")
  //         }
  //       }
  //     }
  //     console.log("risultato check" + this.verifica);
  //
  //   }, err => {
  //     console.log(err);
  //   });
  // return new Promise((resolve, reject) => resolve());
  // }

}
