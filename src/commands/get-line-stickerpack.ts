import { SlashCommandBuilder, type CommandInteraction } from 'discord.js'

const RESPONSE_PREFIX = 'Line has several different Sticker locations (Depending on the age of the sticker). Some of these may not work but one of them might!'

export const data = new SlashCommandBuilder()
  .setName('get-line-stickerpack')
  .setDescription('Lists download links for Line stickerpacks')
  .addStringOption(option =>
    option.setName('stickerpack-id')
      .setDescription('Stickerpack id (from the URL)')
      .setRequired(true))

const formatLineStickerDownloadUrl = (id: string): string[] => {
  const urls: string[] = []

  urls.push('https://stickershop.line-scdn.net/stickershop/v1/product/' + id + '/iphone/stickerpack@2x.zip')
  urls.push('https://stickershop.line-scdn.net/stickershop/v1/product/' + id + '/iphone/sticker_custom_plus_base@2x.zip')
  urls.push('https://stickershop.line-scdn.net/stickershop/v1/product/' + id + '/iphone/sticker_name_base@2x.zip')
  urls.push('https://stickershop.line-scdn.net/stickershop/v1/product/' + id + '/iphone/stickers@2x.zip')
  urls.push('https://stickershop.line-scdn.net/sticonshop/v1/' + id + '/sticon/iphone/package_animation.zip')
  urls.push('https://stickershop.line-scdn.net/sticonshop/v1/' + id + '/sticon/iphone/package.zip?v=1')

  return urls.map((url) => '* ' + url)
}

export async function execute(interaction: CommandInteraction): Promise<void> {
  const stickerpackId = interaction.options.get('stickerpack-id')?.value as string

  let response = 'Please give me a valid stickerpack ID!'
  if (/^[0-9A-F]*$/i.test(stickerpackId)) {
    response = RESPONSE_PREFIX + '\n' + formatLineStickerDownloadUrl(stickerpackId).join('\n')
  }

  try {
    await interaction.reply(response)
  } catch (err) {
    console.log('I experienced a message error')
  }
}
