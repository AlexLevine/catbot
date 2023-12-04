import { Client } from 'discord.js'
import { commands } from './commands'
import { config } from './config'
import { createJobScheduler } from './cron-scheduler'
import { deployCommandsGlobally } from './deploy-commands'
import { fixTwitterUrls, parseTwitterUrls } from './utils'

// const DRAIN_GANG_GUILD = '721491751440875520'
// const TEST_GUILD = '707437104275128362'

const client = new Client({
  intents: ['Guilds', 'GuildMessages', 'DirectMessages', 'MessageContent']
})

client.once('ready', async () => {
  await deployCommandsGlobally()
  console.log('Discord bot is ready! 🤖')
})

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) {
    return
  }
  const { commandName } = interaction
  await commands[commandName as keyof typeof commands].execute(interaction)
})

client.on('messageCreate', async (message) => {
  const foundTwitterUrls = parseTwitterUrls(message.content)

  if (foundTwitterUrls.length > 0) {
    const fixedTwitterUrls = fixTwitterUrls(foundTwitterUrls)
    await message.channel.send(fixedTwitterUrls.join(' , '))
  }
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const cronSchedule = createJobScheduler(client)

// eslint-disable-next-line @typescript-eslint/no-floating-promises
client.login(config.DISCORD_TOKEN)
