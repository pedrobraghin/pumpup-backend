import { Weekday } from '../enums/weekday.enum';

export class Train {
  id: string;
  name: string;
  weekday: Weekday;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
