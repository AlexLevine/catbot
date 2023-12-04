import { SlashCommandBuilder, type CommandInteraction } from 'discord.js'
import { removeFromSchedule } from '../utils/channel-db-utils'

export const data = new SlashCommandBuilder()
  .setName('remove-schedule-daily')
  .setDescription('Removes posting Heathcliff Daily')

export async function execute(interaction: CommandInteraction): Promise<void> {
  try {
    removeFromSchedule(interaction.channelId)

    await interaction.reply(`Removing channel **[${interaction.guild?.channels.cache.find(channel => channel.id === interaction.channelId)?.name}]** to schedule`)
  } catch (err) {
    console.log('I failed :(')
    console.log(err)
  }
}
