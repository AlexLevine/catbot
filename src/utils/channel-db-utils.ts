import { readFileSync, writeFileSync } from 'fs'
import { config } from '../config'

interface ChannelDB {
  channels: string[]
}

export const readChannelScheduleDb = (): ChannelDB => {
  return JSON.parse(readFileSync(config.CHANNEL_DB_FILE_PATH, 'utf8')) as ChannelDB
}

export const addToSchedule = (channelId: string): void => {
  const channelDb = readChannelScheduleDb()

  if (!(channelDb.channels.includes(channelId))) {
    try {
      channelDb.channels.push(channelId)
      writeFileSync(config.CHANNEL_DB_FILE_PATH, JSON.stringify(channelDb))
    } catch (err) {
      console.log('I falled down')
    }
  }
}

export const removeFromSchedule = (channelId: string): void => {
  const channelDb = readChannelScheduleDb()

  if ((channelDb.channels.includes(channelId))) {
    try {
      channelDb.channels.splice(channelDb.channels.indexOf(channelId), 1)
      writeFileSync(config.CHANNEL_DB_FILE_PATH, JSON.stringify(channelDb))
    } catch (err) {
      console.log('Something went wrong')
    }
  }
}
