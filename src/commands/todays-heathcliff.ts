import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { formatHeathUrlFromDate } from "../utils";

export const data = new SlashCommandBuilder()
    .setName("todays-heathcliff")
    .setDescription("Posts Today's Heathcliff");

export async function execute(interaction: CommandInteraction) {
    try {
        interaction.reply(formatHeathUrlFromDate(new Date()));
    }
    catch (err) {
        console.log("I experienced a message error");
        return;
    }
    return;
}
