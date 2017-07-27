import {Component} from '@angular/core';
import {ActionSheetController, AlertController, NavController, NavParams} from 'ionic-angular';
import {Event} from "../../app/model/Event";
import {EventProvider} from "../../providers/event/event";
import {CalendarPage} from "../calendar/calendar";
import {ModificaPage} from "../modifica/modifica";

@Component({
  selector: 'page-event-details',
  templateUrl: 'event-details.html',
})
export class EventDetailsPage {

  selectedEvent: Event = this.navParams.get('selectedEvent');
  giornoStartOrdinato: string;
  startPulita: string;
  endPulita: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private actionSheetCtrl: ActionSheetController, private alertCtrl: AlertController, private eventProvider: EventProvider) {
  }

  ionViewWillEnter() {
    console.log(this.selectedEvent);
    let username: string = this.selectedEvent.user.username;
    let giornoStart = this.selectedEvent.startTime.toString();
    let giornoEnd = this.selectedEvent.endTime.toString();


    let replaceStart = {
      Jan: "Gennaio",
      Feb: "Febbraio",
      Mar: "Marzo",
      Apr: "Aprile",
      May: "Maggio",
      Jun: "Giugno",
      Jul: "Luglio",
      Aug: "Agosto",
      Sep: "Settembre",
      Oct: "Ottobre",
      Nov: "Novembre",
      Dec: "Dicembre",
    };
    giornoStart = giornoStart.replace(/Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/gi, function (matched) {
      return replaceStart[matched];
    });

    let giornoStartSplit = new Array();
    let giornoEndSplit = new Array();
    giornoStartSplit = giornoStart.split(" ");
    giornoEndSplit = giornoEnd.split(" ");
    this.giornoStartOrdinato = giornoStartSplit[2] + "/" + giornoStartSplit[1] + "/" + giornoStartSplit[3];
    this.startPulita = giornoStartSplit[4].slice(0, 5);
    this.endPulita = giornoEndSplit[4].slice(0, 5);
    if (username === atob(localStorage.getItem('currentUser')) || localStorage.getItem('currentUserProfile') === "ROLE_ADMIN" ) {
      this.actionSheetEvento(this.selectedEvent);
    }
  }


  actionSheetEvento(event: Event) {
    let actionSheet = this.actionSheetCtrl.create({
      title: "Hai selezionato " + event.title,
      buttons: [
        {
          text: 'Elimina',
          icon: 'trash',
          role: 'destructive',
          handler: () => {
            this.delete(event);
            console.log('Elimina clicked');

          }
        },
        {
          text: 'Modifica',
          icon: 'create',
          handler: () => {
            this.navCtrl.push(ModificaPage, {
              eventoDaModificare: event
            });
            console.log('Modifica clicked');
          }
        },
        {
          text: 'Annulla',
          role: 'cancel',
          icon: 'close',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }


  delete(event) {
    let confirm = this.alertCtrl.create({
      // title: 'Rimozione evento',
      subTitle: 'Rimuovere ' + event.title + '?',
      buttons: [
        {
          text: 'SI',
          handler: () => {
            console.log('SI clicked');
            this.eventProvider.deleteEvent(event.id).subscribe(val => {
              console.log(val)
              this.navCtrl.setRoot(CalendarPage);
            })
          }
        },
        {
          text: 'NO',
          handler: () => {
            console.log('No clicked');
          }
        }
      ]
    });
    confirm.present();

  }

}
