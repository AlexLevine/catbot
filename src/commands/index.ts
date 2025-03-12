import * as addScheduledHeath from './add-daily'
import * as detectBotPost from './detect-bot-post'
import * as garbageApe from './garbage-ape'
import * as getLineStickerpack from './get-line-stickerpack'
import * as ping from './ping'
import * as randomHeath from './random-heath'
import * as removeScheduledHeath from './remove-daily'
import * as todaysHeath from './todays-heathcliff'
import * as trainerQuote from './trainer-quote'

export const commands = {
  'random-heathcliff': randomHeath,
  'todays-heathcliff': todaysHeath,
  'garbage-ape': garbageApe,
  'schedule-daily': addScheduledHeath,
  'remove-schedule-daily': removeScheduledHeath,
  'get-line-stickerpack': getLineStickerpack,
  'trainer-quote': trainerQuote,
  'detect-bot-post': detectBotPost
}

export const testCommands = {
  ping
}

export const allCommands = {
  ...commands,
  ...testCommands
}
