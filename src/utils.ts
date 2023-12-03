import { readFileSync, writeFileSync } from 'fs'

export const formatHeathUrlFromDate = (date: Date): string => {
  const dd = String(date.getDate()).padStart(2, '0')
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const yyyy = String(date.getFullYear())

  return formatHeathUrl(dd, mm, yyyy)
}

export const formatHeathUrl = (day: string, month: string, year: string): string => {
  return `https://www.gocomics.com/heathcliff/${year}/${month}/${day}`
}

const CHANNEL_DB_FILE_PATH = '/tmp/channels.json'

interface ChannelDB {
  channels: string[]
}

export const readChannelScheduleDb = (): ChannelDB => {
  return JSON.parse(readFileSync(CHANNEL_DB_FILE_PATH, 'utf8')) as ChannelDB
}

export const addToSchedule = (channelId: string): void => {
  const channelDb = readChannelScheduleDb()

  if (!(channelDb.channels.includes(channelId))) {
    try {
      channelDb.channels.push(channelId)
      writeFileSync(CHANNEL_DB_FILE_PATH, JSON.stringify(channelDb))
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
      writeFileSync(CHANNEL_DB_FILE_PATH, JSON.stringify(channelDb))
    } catch (err) {
      console.log('Something went wrong')
    }
  }
}

const TWITTER_DOMAIN = 'https://twitter.com'
const X_DOMAIN = 'https://x.com'
const VX_TWITTER_DOMAIN = 'https://vxtwitter.com'

export const parseTwitterUrls = (messageBody: string): string[] => {
  const words = messageBody.split(/(\s+)/)

  const matches: string[] = []
  words.forEach((word) => {
    if (word.startsWith(X_DOMAIN) || word.startsWith(TWITTER_DOMAIN)) {
      matches.push(word)
    }
  })

  if (matches.length > 0) {
    console.log(`Matches Found: [${matches.join(', ')}]`)
  }

  return matches
}

export const fixTwitterUrls = (originalUrls: string[]): string[] => {
  const fixedUrls: string[] = []

  originalUrls.forEach((url) => {
    if (url.startsWith(X_DOMAIN)) {
      fixedUrls.push(url.replace(X_DOMAIN, VX_TWITTER_DOMAIN))
    }
    if (url.startsWith(TWITTER_DOMAIN)) {
      fixedUrls.push(url.replace(TWITTER_DOMAIN, VX_TWITTER_DOMAIN))
    }
  })

  return fixedUrls
}
