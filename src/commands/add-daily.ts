import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { addToSchedule } from "../utils";

export const data = new SlashCommandBuilder()
    .setName("schedule-daily")
    .setDescription("Schedules posting Heathcliff Daily");

export async function execute(interaction: CommandInteraction) {
    try {
        await addToSchedule(interaction.channelId)
        interaction.reply(`Adding channel **[${interaction.guild?.channels.cache.find(channel => channel.id === interaction.channelId)?.name}]** to schedule`)
    }
    catch (err) {
        console.log("I failed :(");
        console.log(err)
        return;
    }
    return;
}
