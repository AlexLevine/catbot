import { SlashCommandBuilder, type CommandInteraction } from 'discord.js'
import { setTimeout } from 'node:timers/promises'

export const data = new SlashCommandBuilder()
  .setName('detect-bot-post')
  .setDescription('Determines if the prior message is a bot post')

export async function execute(interaction: CommandInteraction): Promise<void> {
  try {
    await interaction.reply('🤔 Evaluating Post...')
    await setTimeout(2_000)
    const percentage = Math.floor(Math.random() * 100)

    if (percentage === 1) {
      await interaction.editReply(`${percentage}% likelihood of bot post. Your meat looks impeccable, ${100 - percentage} human`)
    } else if (percentage >= 99) {
      await interaction.editReply(`${percentage}% likelihood of bot post. Your meat looks impeccable, ${100 - percentage} human`)
    } else if (percentage === 69) {
      await interaction.editReply(`${percentage}% likelihood of bot post... nice 😎`)
    } else {
      await interaction.editReply(`${percentage}% likelihood of bot post`)
    }
  } catch (err) {
    console.log(err)
    console.log('I experienced a problem :(')
  }
}
