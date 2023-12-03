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

const TWITTER_DOMAIN = 'https://twitter.com'
const X_DOMAIN = 'https://x.com'
const VX_TWITTER_DOMAIN = 'https://vxtwitter.com'

export const parseTwitterUrls = (messageBody: string) => {
    const words = messageBody.split(/(\s+)/);

    const matches: string[] = []
    words.forEach((word) => {
        if (word.startsWith(X_DOMAIN) || word.startsWith(TWITTER_DOMAIN)) {
            matches.push(word)
        }
    })

    console.log(`Matches Found: ${matches}`)

    return matches
}

export const fixTwitterUrls = (originalUrls: string[]) => {
    return originalUrls.map((url) => {
        if (url.startsWith(X_DOMAIN)) {
            return url.replace(X_DOMAIN, VX_TWITTER_DOMAIN)
        }
        if (url.startsWith(TWITTER_DOMAIN)) {
            return url.replace(TWITTER_DOMAIN, VX_TWITTER_DOMAIN)
        }
    })
}