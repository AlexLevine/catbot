import { SlashCommandBuilder, type CommandInteraction } from 'discord.js'
import { formatHeathUrl } from '../utils'

const KNOWN_GARBAGE_APES = [
  formatHeathUrl('23', '03', '2008'),
  formatHeathUrl('30', '05', '2013'),
  formatHeathUrl('15', '10', '2013'),
  formatHeathUrl('02', '12', '2013'),
  formatHeathUrl('24', '03', '2014'),
  formatHeathUrl('08', '07', '2014'),
  formatHeathUrl('25', '07', '2014'),
  formatHeathUrl('28', '09', '2014'),
  formatHeathUrl('09', '06', '2015'),
  formatHeathUrl('25', '11', '2015'),
  formatHeathUrl('23', '02', '2016'),
  formatHeathUrl('10', '04', '2016'),
  formatHeathUrl('28', '07', '2016'),
  formatHeathUrl('31', '12', '2016'),
  formatHeathUrl('08', '03', '2017'),
  formatHeathUrl('20', '09', '2017'),
  formatHeathUrl('12', '12', '2017'),
  formatHeathUrl('06', '12', '2018'),
  formatHeathUrl('24', '02', '2019'),
  formatHeathUrl('24', '02', '2019'),
  formatHeathUrl('15', '02', '2021'),
  formatHeathUrl('06', '04', '2021')
]

export const data = new SlashCommandBuilder()
  .setName('garbage-ape')
  .setDescription('Garbage Ape Posting')

export async function execute(interaction: CommandInteraction): Promise<void> {
  try {
    await interaction.reply(KNOWN_GARBAGE_APES[Math.floor(Math.random() * KNOWN_GARBAGE_APES.length)])
  } catch (err) {
    console.log(err)
    console.log("Well that's not supposed to happen")
  }
}
