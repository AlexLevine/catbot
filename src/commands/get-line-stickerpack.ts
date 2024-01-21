import { SlashCommandBuilder, type CommandInteraction } from 'discord.js'
import { getLineStickerpackUrls } from '../utils/line-stickerpack-utils'

const RESPONSE_PREFIX = 'Line has several different Sticker locations (Depending on the age of the sticker). Some of these may not work but one of them might!'

// lmao
// adding an option changes the type that SlashCommandBuilder()
// returns... It's now Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">
// So SlashCommandBuilder... Does not build a SlashCommand... Strictly speaking
// Well. to make it easier to deploy the commands, we'll lie
export const data: SlashCommandBuilder = new SlashCommandBuilder()
  .setName('get-line-stickerpack')
  .setDescription('Lists download links for Line stickerpacks')
  .addStringOption(option =>
    option.setName('stickerpack-id')
      .setDescription('Stickerpack id (from the URL)')
      .setRequired(true)) as SlashCommandBuilder

export async function execute(interaction: CommandInteraction): Promise<void> {
  const stickerpackId = interaction.options.get('stickerpack-id')?.value as string

  let response = 'Please give me a valid stickerpack ID!'
  if (/^[0-9A-F]*$/i.test(stickerpackId)) {
    const stickerpackUrls = await getLineStickerpackUrls(stickerpackId)

    response = RESPONSE_PREFIX + '\n' + stickerpackUrls
      .map((url) => '* ' + url)
      .join('\n')
  }

  try {
    await interaction.reply(response)
  } catch (err) {
    console.log('I experienced a message error')
  }
}
