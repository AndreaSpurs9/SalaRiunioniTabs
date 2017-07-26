import { Component } from '@angular/core';

import { CalendarPage } from '../calendar/calendar';
import {PrenotaPage} from "../prenota/prenota";
import {LoginPage} from "../login/login";
import {RegisterPage} from "../register/register";
import {LogoutPage} from "../logout/logout";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = CalendarPage;
  tab2Root = PrenotaPage;
  tab3Root = LoginPage;
  tab4Root = RegisterPage;
  tab5Root = LogoutPage;
  constructor() {

  }
}
