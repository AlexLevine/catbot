import { CronJob } from "cron";
import { Client, TextChannel } from "discord.js";
import { formatHeathUrlFromDate, readChannelScheduleDb } from "./utils";

export const sendToScheduledChannels = (client: Client) => {
    const channelScheduleDb = readChannelScheduleDb()
    var url = formatHeathUrlFromDate(new Date())

    channelScheduleDb.channels.forEach((channelId) => {
        console.log(`Attempting to send a message to ${channelId}`)
        try {
            client.channels.fetch(channelId)
                .then((channel) => (channel as TextChannel).send(`Your Scheduled Heathcliff: ${url} \nUse \`/remove-schedule-daily\` to kill me`))
        } catch (err) {
            console.log(err)
            console.log(`I experienced a message error trying to send to ${channelId}`);
            return;
        }
    })
}

export const createJobScheduler = (client: Client) => {
    return new CronJob(
        '00 00 09 * * *',
        () => {
            sendToScheduledChannels(client)
        },
        null,
        true,
        'America/Los_Angeles'
    );
}
