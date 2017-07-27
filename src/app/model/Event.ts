import {User} from "./User";

export class Event {
  id?: number;
  title: string;
  startTime: string;
  endTime: string;
  allDay: boolean;
  giorno?: string;
  user: User;
}
