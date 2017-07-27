import {NgModule, ErrorHandler, LOCALE_ID} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {SalaRiunioni} from './app.component';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {NgCalendarModule} from "ionic2-calendar";
import {CalendarPage} from "../pages/calendar/calendar";
import {EventProvider} from '../providers/event/event';
import {TabsPage} from "../pages/tabs/tabs";
import {BrowserXhr, HttpModule} from "@angular/http";
import {PrenotaPage} from "../pages/prenota/prenota";
import {UserProvider} from '../providers/user/user';
import {LoginPage} from "../pages/login/login";
import {RegisterPage} from "../pages/register/register";
import {CustomBrowserXhr} from "./services/custom-browser-xhr";
import {EventDetailsPage} from "../pages/event-details/event-details";
import {IonicStorageModule} from "@ionic/storage";
import {ModificaPage} from "../pages/modifica/modifica";


@NgModule({
  declarations: [
    SalaRiunioni,
    TabsPage,
    CalendarPage,
    PrenotaPage,
    LoginPage,
    RegisterPage,
    EventDetailsPage,
    ModificaPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(SalaRiunioni, {
      monthNames: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
      monthShortNames: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'],
      dayNames: ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'],
      dayShortNames: ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'],
    }),
    NgCalendarModule,
    HttpModule,
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    SalaRiunioni,
    TabsPage,
    CalendarPage,
    PrenotaPage,
    LoginPage,
    RegisterPage,
    EventDetailsPage,
    ModificaPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EventProvider,
    {provide: LOCALE_ID, useValue: 'it-IT'},
    UserProvider,
    {provide: BrowserXhr, useClass: CustomBrowserXhr},
    Storage,
  ]
})
export class AppModule {
}
