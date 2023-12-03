import { REST, Routes, type RouteLike } from 'discord.js'
import { commands } from './commands'
import { config } from './config'

const commandsData = Object.values(commands).map((command) => command.data)

const rest = new REST({ version: '10' }).setToken(config.DISCORD_TOKEN)

interface DeployCommandsProps {
  guildId: string
}

export const deployCommands = async ({ guildId }: DeployCommandsProps): Promise<void> => {
  await deployCommandsHelper(Routes.applicationGuildCommands(config.DISCORD_CLIENT_ID, guildId))
}

export const deployCommandsGlobally = async (): Promise<void> => {
  await deployCommandsHelper(Routes.applicationCommands(config.DISCORD_CLIENT_ID))
}

const deployCommandsHelper = async (route: RouteLike): Promise<void> => {
  try {
    console.log(`Started refreshing application (/) commands. - ${route}`)
    console.log(commandsData)
    await rest.put(
      route,
      {
        body: commandsData
      }
    )

    console.log('Successfully reloaded application (/) commands.')
  } catch (error) {
    console.error(error)
  }
}

export const removeCommandsHelper = async ({ guildId }: DeployCommandsProps): Promise<void> => {
  try {
    await rest.put(
      Routes.applicationGuildCommands(config.DISCORD_CLIENT_ID, guildId),
      {
        body: []
      }
    )

    console.log('Successfully reloaded application (/) commands.')
  } catch (error) {
    console.error(error)
  }
}
