import consoleStamp from 'console-stamp'
import { Client, Events, GatewayIntentBits, Partials } from 'discord.js'
import { allCommands } from './commands'
import { config } from './config'
import { createJobScheduler } from './cron-scheduler'
import { deployCommandsGlobally } from './deploy-commands'

// const DRAIN_GANG_GUILD = '721491751440875520'
// const TEST_GUILD = '707437104275128362'

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
  try {
    await allCommands[commandName as keyof typeof allCommands].execute(interaction)
  } catch (err) {
    console.error(err)
  }
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const cronSchedule = createJobScheduler(client)

// eslint-disable-next-line @typescript-eslint/no-floating-promises
client.login(config.DISCORD_TOKEN)
