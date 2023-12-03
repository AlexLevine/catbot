import * as addScheduledHeath from './add-daily'
import * as garbageApe from './garbage-ape'
import * as randomHeath from './random-heath'
import * as removeScheduledHeath from './remove-daily'
import * as todaysHeath from './todays-heathcliff'

export const commands = {
  'random-heathcliff': randomHeath,
  'todays-heathcliff': todaysHeath,
  'garbage-ape': garbageApe,
  'schedule-daily': addScheduledHeath,
  'remove-schedule-daily': removeScheduledHeath
}
