import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {URL_BACKEND} from "../../app/util/util";

@Injectable()
export class EventProvider {

  constructor(public http: Http) {
  }


  getAllEvents() {
    return this.http.get(URL_BACKEND + 'event/getAllEvent').map(res => res.json());
  }

  createEvent(evento) {
    return this.http.post(URL_BACKEND + 'event/createEvent', evento).map((data) => data.json());
  }

  deleteEvent(eventId: number) {
    return this.http.delete(URL_BACKEND + 'event/delete/' + eventId);
  }

}
