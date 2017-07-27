import {Component, ViewChild} from '@angular/core';
import {CalendarComponent} from "ionic2-calendar/calendar";
import {EventProvider} from "../../providers/event/event";
import {ActionSheetController, NavController} from "ionic-angular";
import {LoginPage} from "../login/login";
import {PrenotaPage} from "../prenota/prenota";
import {UserProvider} from "../../providers/user/user";
import {EventDetailsPage} from "../event-details/event-details";
import {Event} from "../../app/model/Event";

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
  data: Date;

  constructor(private navController: NavController, private eventProvider: EventProvider, private actionSheetCtrl: ActionSheetController, private userProvider: UserProvider) {
  }

  ionViewWillEnter() {
    this.loadEvents();
    if (localStorage.getItem('currentUser') === null && localStorage.getItem('currentPassword') === null ) {
      this.navController.setRoot(LoginPage);
    }
    this.dataSelezionata = "";
    this.calendar.currentDate = new Date();
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

  onEventSelected(event: Event) {
    console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title + event.user.username);
    this.navController.push(EventDetailsPage, {
      selectedEvent: event
    });
    // console.log("evento selezionato: " + event);
    // console.log("user: " + event.user.username);


  }

  today() {
    this.calendar.currentDate = new Date();
  }

  onTimeSelected(ev) {
    console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
      (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    this.data = ev.selectedTime;
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
          user: a.user,
          giorno: a.giorno,
        });
      }
      this.myCalendar.loadEvents();
      console.log(this.eventList);
    }, err => {
      console.log(err);
    });
  }

  add() {
    console.log("add" + this.data)
    if(this.data===this.calendar.currentDate){
      this.dataSelezionata=this.data.toISOString();
    }
    else{
      this.data.setDate(this.data.getDate() + 1);
      this.dataSelezionata = this.data.toISOString();
      console.log("time selected" + this.dataSelezionata)
    }
    this.navController.push(PrenotaPage, {
      oggi: this.dataSelezionata
    });
  }


  actionSheetLogout() {
    let actionSheet = this.actionSheetCtrl.create({
      title: "Sei loggato come " + atob(localStorage.getItem('currentUser')),
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

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUserProfile');
    localStorage.removeItem('currentPassword');
    this.userProvider.logout().subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
    this.navController.setRoot(LoginPage);
  }

}
