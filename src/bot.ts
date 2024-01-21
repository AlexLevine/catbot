import consoleStamp from 'console-stamp'
import { Client, Events, GatewayIntentBits, Partials } from 'discord.js'
import { allCommands } from './commands'
import { config } from './config'
import { createJobScheduler } from './cron-scheduler'
import { deployCommandsGlobally } from './deploy-commands'
import { fixEmbedUrls, isolateUrlsToFix } from './utils/fix-embed-utils'

// const DRAIN_GANG_GUILD = '721491751440875520'
const TEST_GUILD = '707437104275128362'

consoleStamp(console)

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.Reaction,
    Partials.User
  ]
})

client.once('ready', async () => {
  await deployCommandsGlobally()
  console.log('Discord bot is ready! 🤖')
})

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isCommand()) {
    return
  }
  const { commandName } = interaction
  await allCommands[commandName as keyof typeof allCommands].execute(interaction)
})

client.on(Events.MessageCreate, async (message) => {
  const fixedUrls = fixEmbedUrls(isolateUrlsToFix(message.content))

  if (fixedUrls.length > 0) {
    const botResponse = await message.channel.send(fixedUrls.join(' , '))
    await botResponse.react('🗑️')
  }
})

client.on(Events.MessageReactionAdd, async (reaction, user) => {
  if (user.bot) return

  // If the message isn't in the message cache, the author
  // attribute will be null. So we'll just ignore those messages
  if (reaction.message.author === null) {
    return
  }

  if (client.user === null) {
    return
  }

  // ignore reactions on messages that weren't originally sent by catboy.exe
  if (reaction.message.author.id !== client.user.id) {
    return
  }

  if (reaction.emoji.name === '🗑️') {
    await reaction.message.delete()
  }
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const cronSchedule = createJobScheduler(client)

// eslint-disable-next-line @typescript-eslint/no-floating-promises
client.login(config.DISCORD_TOKEN)
