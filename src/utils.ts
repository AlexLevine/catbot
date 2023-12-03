import { readFileSync, writeFileSync } from 'fs';

export const formatHeathUrlFromDate = (date: Date): string => {
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0');
    var yyyy = String(date.getFullYear());

    return formatHeathUrl(dd, mm, yyyy)
}

export const formatHeathUrl = (day: string, month: string, year: string) => {
    return `https://www.gocomics.com/heathcliff/${year}/${month}/${day}`
}

const CHANNEL_DB_FILE_PATH = '/tmp/channels.json'

interface ChannelDB {
    channels: string[]
}

export const readChannelScheduleDb = () => {
    return JSON.parse(readFileSync(CHANNEL_DB_FILE_PATH, 'utf8')) as ChannelDB
}

export const addToSchedule = async (channelId: string) => {
    const channelDb = readChannelScheduleDb()

    if (!(channelDb.channels.includes(channelId))) {
        try {
            channelDb.channels.push(channelId)
            writeFileSync(CHANNEL_DB_FILE_PATH, JSON.stringify(channelDb))
        }
        catch (err) {
            console.log("I falled down");
            return;
        }
    }
}


export const removeFromSchedule = async (channelId: string) => {
    const channelDb = readChannelScheduleDb()

    if ((channelDb.channels.includes(channelId))) {
        try {
            channelDb.channels.splice(channelDb.channels.indexOf(channelId), 1)
            writeFileSync(CHANNEL_DB_FILE_PATH, JSON.stringify(channelDb))
        }
        catch (err) {
            console.log("Something went wrong");
            return;
        }
    }
}