import * as addScheduledHeath from './add-daily'
import * as garbageApe from './garbage-ape'
import * as getLineStickerpack from './get-line-stickerpack'
import * as ping from './ping'
import * as randomHeath from './random-heath'
import * as removeScheduledHeath from './remove-daily'
import * as todaysHeath from './todays-heathcliff'

export const commands = {
  'random-heathcliff': randomHeath,
  'todays-heathcliff': todaysHeath,
  'garbage-ape': garbageApe,
  'schedule-daily': addScheduledHeath,
  'remove-schedule-daily': removeScheduledHeath,
  'get-line-stickerpack': getLineStickerpack
}

export const testCommands = {
  ping
}

export const allCommands = {
  ...commands,
  ...testCommands
}
