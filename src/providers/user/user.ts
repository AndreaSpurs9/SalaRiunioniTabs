import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {URL_BACKEND} from "../../app/util/util";

/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UserProvider {

  constructor(public http: Http) {
  }

  login(user) {
    return this.http.post(URL_BACKEND + "login", user).map((data) => data.json());
  }

  register (user) {
    return this.http.post(URL_BACKEND + "register", user).map((data) => data.json());
  }

  logout () {
    return this.http.get(URL_BACKEND + "logoutApp").map((data) => data.json());
  }

}
