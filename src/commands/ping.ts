import { SlashCommandBuilder, type CommandInteraction } from 'discord.js'

export const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('ping')

export async function execute(interaction: CommandInteraction): Promise<void> {
  try {
    await interaction.reply('pong')
  } catch (err) {
    console.log('I experienced a message error')
  }
}
