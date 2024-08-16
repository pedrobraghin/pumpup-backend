import { Weekday } from '../enums/weekday.enum';

export interface ITrainFilterConditions {
  name?: {
    contains: string;
    mode: 'insensitive';
  };
  weekday?: Weekday;
}