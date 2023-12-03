import * as addScheduledHeath from './add-daily';
import * as randomHeath from "./random-heath";
import * as removeScheduledHeath from './remove-daily';
import * as todaysHeath from "./todays-heathcliff";


export const commands = {
  'random-heathcliff': randomHeath,
  'todays-heathcliff': todaysHeath,
  'schedule-daily': addScheduledHeath,
  'remove-schedule-daily': removeScheduledHeath
};
