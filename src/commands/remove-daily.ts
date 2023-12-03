import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { removeFromSchedule } from "../utils";

export const data = new SlashCommandBuilder()
    .setName("remove-schedule-daily")
    .setDescription("Removes posting Heathcliff Daily");

export async function execute(interaction: CommandInteraction) {
    try {
        removeFromSchedule(interaction.channelId)
        interaction.reply(`Removing channel **[${interaction.guild?.channels.cache.find(channel => channel.id === interaction.channelId)?.name}]** to schedule`)
    }
    catch (err) {
        console.log("I failed :(");
        console.log(err)
        return;
    }
    return;
}
