import { SlashCommandBuilder, type CommandInteraction } from 'discord.js'
import { TRAINER_QUOTES } from '../data/trainer-quotes'

export const data = new SlashCommandBuilder()
  .setName('trainer-quote')
  .setDescription('Posts A Random Trainer Quote')

export async function execute(interaction: CommandInteraction): Promise<void> {
  try {
    const randomElement = TRAINER_QUOTES[Math.floor(Math.random() * TRAINER_QUOTES.length)]
    await interaction.reply(randomElement)
  } catch (err) {
    console.log('I experienced a message error')
  }
}
