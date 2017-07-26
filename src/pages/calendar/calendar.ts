import {Component, ViewChild} from '@angular/core';
import {CalendarComponent} from "ionic2-calendar/calendar";
import {EventProvider} from "../../providers/event/event";
import {ActionSheetController, AlertController, NavController} from "ionic-angular";
import {LoginPage} from "../login/login";
import {PrenotaPage} from "../prenota/prenota";
import {UserProvider} from "../../providers/user/user";

@Component({
  templateUrl: "calendar.html"
})
export class CalendarPage {
  viewTitle;
  eventList;
  @ViewChild(CalendarComponent)
  myCalendar: CalendarComponent;
  giornoInteroLabel: string = "Giorno intero";
  nessunaPrenotazioneLabel: string = "Nessuna prenotazione";
  dataSelezionata: string;

  constructor(private navController: NavController, private eventProvider: EventProvider, private alertCtrl: AlertController, private actionSheetCtrl: ActionSheetController, private userProvider: UserProvider) {
  }

  ionViewWillEnter() {
    this.loadEvents();
    if (localStorage.getItem('currentUser') === null) {
      this.navController.setRoot(LoginPage);
    }
  }

  isToday: boolean;
  calendar = {
    mode: 'month',
    currentDate: new Date(),
    dateFormatter: {
      formatMonthViewDay: function (date: Date) {
        return date.getDate().toString();
      },
      formatMonthViewDayHeader: function (date: Date) {
        return 'MonMH';
      },
      formatMonthViewTitle: function (date: Date) {
        return 'testMT';
      },
      formatWeekViewDayHeader: function (date: Date) {
        return 'MonWH';
      },
      formatWeekViewTitle: function (date: Date) {
        return 'testWT';
      },
      formatWeekViewHourColumn: function (date: Date) {
        return 'testWH';
      },
      formatDayViewHourColumn: function (date: Date) {
        return 'testDH';
      },
      formatDayViewTitle: function (date: Date) {
        return 'testDT';
      }
    }
  };


  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onEventSelected(event) {
    console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
    if (event.user.toString().equals(localStorage.getItem('currentUser'))) {
      this.actionSheetEvento(event);
    } else {

    }

  }

  today() {
    this.calendar.currentDate = new Date();
  }

  onTimeSelected(ev) {
    console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
      (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    let date = ev.selectedTime;
    date.setDate(date.getDate() + 1);
    this.dataSelezionata = date.toISOString();
    console.log("time selected" + this.dataSelezionata)
  }

  onCurrentDateChanged(event: Date) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === event.getTime();
  }

  onRangeChanged(ev) {
    console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }

  markDisabled = (date: Date) => {
    var current = new Date();
    current.setHours(0, 0, 0);
    return date < current;
  };


  loadEvents() {
    this.eventProvider.getAllEvents().subscribe(res => {
      this.eventList = new Array();
      for (let a of res) {
        this.eventList.push({
          id: a.id,
          title: a.title,
          startTime: new Date(a.startTime),
          endTime: new Date(a.endTime),
          allDay: a.allDay,
        });
      }
      this.myCalendar.loadEvents();
    }, err => {
      console.log(err);
    });
  }

  add() {
    console.log("add" + this.dataSelezionata)
    this.navController.push(PrenotaPage, {
      oggi: this.dataSelezionata
    });
  }


  flush() {
    this.navController.setRoot(CalendarPage)
  }


  actionSheetLogout() {
    let actionSheet = this.actionSheetCtrl.create({
      title: "Sei loggato come " + localStorage.getItem('currentUser'),
      buttons: [
        {
          text: 'Logout',
          icon: 'log-out',
          handler: () => {
            this.logout();
            console.log('Logout clicked');
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


  actionSheetEvento(event) {
    let actionSheet = this.actionSheetCtrl.create({
      title: "Hai selezionato " + event.title,
      buttons: [
        {
          text: 'Elimina',
          icon: 'trash',
          role: 'destructive',
          handler: () => {
            console.log('Elimina clicked');
          }
        },
        {
          text: 'Modifica',
          icon: 'create',
          handler: () => {
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


  logout() {
    localStorage.removeItem('currentUser');
    this.userProvider.logout().subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
    this.navController.setRoot(LoginPage);
  }

  elimina(event) {
    let confirm = this.alertCtrl.create({
      title: 'Conferma',
      subTitle: 'Vuoi eliminare' + event.title + '?',
      buttons: [
        {
          text: 'SI',
          handler: () => {
            console.log('Si clicked');
            this.eventProvider.deleteEvent(event.id).subscribe(val => {
              console.log(val);
              this.flush();
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

