import { CronJob } from 'cron'
import { type Client, type TextChannel } from 'discord.js'
import { readChannelScheduleDb } from './utils/channel-db-utils'
import { formatHeathUrlFromDate } from './utils/heathcliff-format-utils'

export const sendToScheduledChannels = async (client: Client): Promise<void> => {
  const channelScheduleDb = readChannelScheduleDb()
  const url = formatHeathUrlFromDate(new Date())

  await Promise.all(channelScheduleDb.channels.map(async (channelId) => {
    console.log(`Attempting to send a message to ${channelId}`)
    try {
      return await client.channels.fetch(channelId)
        .then(async (channel) => await (channel as TextChannel).send(`Your Scheduled Heathcliff: ${url} \nUse \`/remove-schedule-daily\` to kill me`))
    } catch (err) {
      console.log(err)
      console.log(`I experienced a message error trying to send to ${channelId}`)
    }
  }))
}

export const createJobScheduler = async (client: Client): Promise<CronJob> => {
  return new CronJob(
    '00 00 09 * * *',
    async () => {
      await sendToScheduledChannels(client)
    },
    null,
    true,
    'America/Los_Angeles'
  )
}
