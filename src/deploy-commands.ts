import { REST, Routes, type RouteLike, type SlashCommandBuilder } from 'discord.js'
import { commands, testCommands } from './commands'
import { config } from './config'

const commandsData: SlashCommandBuilder[] = Object.values(commands).map((command) => command.data)

const testCommandsData: SlashCommandBuilder[] = Object.values(testCommands).map((command) => command.data)

const rest = new REST({ version: '10' }).setToken(config.DISCORD_TOKEN)

interface DeployCommandsProps {
  guildId: string
}

export const deployTestCommands = async ({ guildId }: DeployCommandsProps): Promise<void> => {
  await deployCommandsHelper(Routes.applicationGuildCommands(config.DISCORD_CLIENT_ID, guildId), testCommandsData)
}

export const deployCommandsGlobally = async (): Promise<void> => {
  await deployCommandsHelper(Routes.applicationCommands(config.DISCORD_CLIENT_ID), commandsData)
}

const deployCommandsHelper = async (route: RouteLike, slashCommands: SlashCommandBuilder[]): Promise<void> => {
  try {
    console.log(`Started refreshing application (/) commands. - ${route}`)
    console.log(slashCommands)
    await rest.put(
      route,
      {
        body: slashCommands
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
