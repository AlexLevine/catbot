import { SlashCommandBuilder, type CommandInteraction } from 'discord.js'
import { addToSchedule } from '../utils/channel-db-utils'

export const data = new SlashCommandBuilder()
  .setName('schedule-daily')
  .setDescription('Schedules posting Heathcliff Daily')

export async function execute(interaction: CommandInteraction): Promise<void> {
  try {
    addToSchedule(interaction.channelId)
    await interaction.reply(`Adding channel **[${interaction.guild?.channels.cache.find(channel => channel.id === interaction.channelId)?.name}]** to schedule`)
  } catch (err) {
    console.log('I failed :(')
    console.log(err)
  }
}
