import { SlashCommandBuilder, type CommandInteraction } from 'discord.js'
import { formatHeathUrlFromDate } from '../utils/heathcliff-format-utils'

export const data = new SlashCommandBuilder()
  .setName('todays-heathcliff')
  .setDescription("Posts Today's Heathcliff")

export async function execute(interaction: CommandInteraction): Promise<void> {
  try {
    await interaction.reply(formatHeathUrlFromDate(new Date()))
  } catch (err) {
    console.log('I experienced a message error')
  }
}
